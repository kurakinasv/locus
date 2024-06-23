import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { ENDPOINTS } from 'config/api/endpoints';
import { axiosInstance } from 'config/api/requests';
import { Product, ProductServer } from 'entities/product';
import { normalizeProduct } from 'entities/product/normalize';
import { CreateListItemParams, EditBodyParams, EditListItemParams } from 'entities/product/params';
import { ShoppingList } from 'entities/shoppingList';
import { ILocalStore } from 'store/interfaces';
import MetaModel from 'store/models/MetaModel';
import RootStore from 'store/RootStore';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class ProductsStore implements ILocalStore {
  private readonly _rootStore: RootStore;

  readonly meta = {
    getProducts: new MetaModel(),
  };

  readonly listId: ShoppingList['id'];

  products: Product[] = [];

  constructor(rootStore: RootStore, listId: ShoppingList['id']) {
    this._rootStore = rootStore;

    this.listId = listId;

    makeAutoObservable(this);
  }

  setProducts = (products: Product[]) => {
    this.products = products;
  };

  getProducts = async () => {
    try {
      this.meta.getProducts.startLoading();

      const products = await axiosInstance.get<ProductServer[]>(
        ENDPOINTS.getProducts.getUrl(String(this.listId)),
        { withCredentials: true }
      );

      if (!responseIsOk(products)) {
        this.meta.getProducts.stopLoading();
        return;
      }

      this.setProducts(products.data.map(normalizeProduct));

      this.meta.getProducts.stopLoading();
    } catch (err) {
      this.meta.getProducts.stopLoading();
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(err));
    }
  };

  createProduct = async ({ name, price }: CreateListItemParams) => {
    try {
      const product = await axiosInstance.post<ProductServer>(
        ENDPOINTS.addProduct.getUrl(String(this.listId)),
        {
          name: name.trim(),
          price,
        },
        { withCredentials: true }
      );

      if (!responseIsOk(product)) {
        return;
      }

      this.setProducts([...this.products, normalizeProduct(product.data)]);
    } catch (err) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(err));
    }
  };

  editProduct = async ({ listItemId, name, price, bought }: EditListItemParams) => {
    try {
      const response = await axiosInstance.put<
        ProductServer,
        AxiosResponse<ProductServer>,
        EditBodyParams
      >(
        ENDPOINTS.editProduct.getUrl(String(this.listId), String(listItemId)),
        {
          name: name?.trim(),
          price,
          checked: bought,
        },
        { withCredentials: true }
      );

      if (!responseIsOk(response)) {
        return;
      }

      this.setProducts(
        this.products.map((product) =>
          product.id === listItemId ? { ...product, bought: response.data.checked } : product
        )
      );
    } catch (err) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(err));
    }
  };

  deleteProduct = async (listItemId: Product['id']) => {
    try {
      const product = await axiosInstance.delete<{ message: string }>(
        ENDPOINTS.deleteProduct.getUrl(String(this.listId), String(listItemId)),
        { withCredentials: true }
      );

      if (!responseIsOk(product)) {
        return;
      }

      this.setProducts(this.products.filter((product) => product.id !== listItemId));
    } catch (err) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(err));
    }
  };

  destroy() {}
}

export default ProductsStore;
