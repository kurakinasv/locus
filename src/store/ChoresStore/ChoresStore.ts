import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { SnackbarType } from 'config/snackbar';
import { Chore } from 'entities/chore';
import { ChoreCreateParams, ChoreEditParams, ChoresGetParams } from 'entities/chore/params';
import { ChoreServer } from 'entities/chore/server';
import RootStore from 'store/RootStore';
import { DefaultId } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class ChoresStore {
  private readonly _rootStore: RootStore;

  chores: Chore[] = [];

  activeChore: Chore | null = null;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  get choresOptions() {
    const opts = this.chores.map((chore) => ({
      label: chore.name,
      value: String(chore.id),
    }));

    return opts;
  }

  setChores = (chores: Chore[]) => {
    this.chores = chores.filter((chore) => chore.isArchived === false);
  };

  getChore = async (id: DefaultId) => {
    try {
      const response = await axios.get(ENDPOINTS.getChore.getUrl!(String(id)), {
        withCredentials: true,
      });

      if (response.data) {
        runInAction(() => {
          this.activeChore = response.data;
        });

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getChoresInGroup = async (params?: ChoresGetParams) => {
    try {
      let query = '';

      if (params?.name) {
        query = `${query}?name=${params.name.trim().toLowerCase()}`;
      }
      if (params?.categoryId) {
        const sym = query ? '&' : '?';
        query = `${query}${sym}categoryId=${params.categoryId}`;
      }

      const response = await axios.get(ENDPOINTS.getChoresInGroup.getUrl!(encodeURI(query)), {
        withCredentials: true,
      });

      if (response.data) {
        this.setChores(response.data);

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createChore = async ({ name, points, categoryId }: ChoreCreateParams) => {
    try {
      const response = await axios.post(
        ENDPOINTS.createChore.url,
        {
          name: name.trim(),
          points,
          categoryId,
        },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.setChores([...this.chores, response.data]);

        this._rootStore.uiStore.snackbar.open(SnackbarType.choreCreated);

        return true;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editChore = async ({ choreId, name, points, categoryId, isArchived }: ChoreEditParams) => {
    try {
      const response = await axios.put<ChoreServer[]>(
        ENDPOINTS.editChore.getUrl!(String(choreId)),
        { name: name?.trim(), points, categoryId, isArchived },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.setChores(response.data);

        this._rootStore.uiStore.snackbar.open(SnackbarType.choreUpdated);

        return true;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default ChoresStore;
