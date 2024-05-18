import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { axiosInstance } from 'config/api/requests';
import { SnackbarType } from 'config/snackbar';
import {
  ListCreateParams,
  ListEditParams,
  ShoppingList,
  ShoppingListServer,
  normalizeShoppingList,
} from 'entities/shoppingList';
import MetaModel from 'store/models/MetaModel';
import RootStore from 'store/RootStore';
import { cutTimezone } from 'utils/formatDate';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class ShoppingListStore {
  private readonly _rootStore: RootStore;

  readonly meta = {
    getLists: new MetaModel(),
  };

  activeList: ShoppingList | null = null;
  lists: ShoppingList[] = [];

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable<ShoppingListStore>(this);
  }

  setShoppingLists = (lists: ShoppingList[]) => {
    this.lists = lists;
  };

  getShoppingLists = async () => {
    try {
      if (this.meta.getLists.loading) {
        return;
      }

      this.meta.getLists.startLoading();

      const response = await axiosInstance.get<ShoppingListServer[]>(
        ENDPOINTS.getShoppingLists.url,
        { withCredentials: true }
      );

      if (!responseIsOk(response)) {
        this.meta.getLists.stopLoading();
        return;
      }

      this.setShoppingLists(response.data.map(normalizeShoppingList));

      this.meta.getLists.stopLoading();

      return response.data;
    } catch (error) {
      this.meta.getLists.stopLoading();
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getShopingList = async (listId: ShoppingList['id']) => {
    try {
      const response = await axiosInstance.get<ShoppingListServer>(
        ENDPOINTS.getShoppingList.getUrl(String(listId)),
        { withCredentials: true }
      );

      if (!responseIsOk(response)) {
        return;
      }

      runInAction(() => {
        this.activeList = normalizeShoppingList(response.data);
      });

      return response.data;
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createShoppingList = async (params: ListCreateParams) => {
    try {
      const response = await axiosInstance.post<ShoppingListServer>(
        ENDPOINTS.createShoppingList.url,
        {
          name: params.name.trim(),
          description: params.description?.trim(),
          purchaseDate: params.purchaseDate
            ? cutTimezone(params.purchaseDate).toISOString()
            : undefined,
        },
        { withCredentials: true }
      );

      if (!responseIsOk(response)) {
        this.meta.getLists.stopLoading();
        return;
      }

      this.setShoppingLists([...this.lists, normalizeShoppingList(response.data)]);

      this._rootStore.uiStore.snackbar.open(SnackbarType.listCreated);

      return response.data;
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editShoppingList = async (params: ListEditParams) => {
    try {
      const response = await axiosInstance.put<ShoppingListServer[]>(
        ENDPOINTS.editShoppingList.getUrl(String(params.id)),
        {
          name: params.name?.trim(),
          description: params.description?.trim(),
          purchaseDate: params.purchaseDate
            ? cutTimezone(params.purchaseDate).toISOString()
            : undefined,
        },
        { withCredentials: true }
      );

      if (!responseIsOk(response)) {
        return;
      }

      runInAction(() => {
        this.setShoppingLists(response.data.map(normalizeShoppingList));
      });

      this._rootStore.uiStore.snackbar.open(SnackbarType.listEdited);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  deleteShoppingList = async (listId: ShoppingList['id']) => {
    try {
      const response = await axiosInstance.delete<{ message: string }>(
        ENDPOINTS.deleteShoppingList.getUrl(String(listId)),
        { withCredentials: true }
      );

      if (!responseIsOk(response)) {
        return;
      }

      this.setShoppingLists(this.lists.filter((list) => list.id !== listId));

      this._rootStore.uiStore.snackbar.open(SnackbarType.listDeleted);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  destroy = () => {
    this.lists = [];
    this.activeList = null;
  };
}

export default ShoppingListStore;
