import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { CREATE_CATEGORY_OPTION, ScheduleFrequency } from 'config/chores';
import { SnackbarType } from 'config/snackbar';
import { Chore, ChoreCategory, ChoreCategoryIcon } from 'entities/chore';
import { MOCK_CHORES_CATEGORIES, MOCK_CHORE_LIST } from 'entities/mock/chores';
import RootStore from 'store/RootStore';
import { DefaultId, UUIDString } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { sleep } from 'utils/sleep';

class ChoresStore {
  private readonly _rootStore: RootStore;

  chores: Chore[] = MOCK_CHORE_LIST;

  activeChore: Chore | null = null;

  categories: ChoreCategory[] = MOCK_CHORES_CATEGORIES;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  get choresOptions() {
    const opts = this.categories.map((chore) => ({
      label: chore.name,
      value: String(chore.id),
    }));

    // todo: remove
    return [...opts, { label: 'Create new chore', value: 'new' }];
  }

  get categoriesOptions() {
    const opts = this.categories.map((cat) => ({
      label: cat.name,
      value: String(cat.id),
    }));

    return [CREATE_CATEGORY_OPTION, ...opts];
  }

  getChore = async (id: DefaultId) => {
    try {
      console.log('getChore', id);

      // const response = await axios.get(ENDPOINTS.getChore.url(id), { withCredentials: true });
      await sleep(1000);
      const response = { data: MOCK_CHORE_LIST[id - 1] };

      if (response.data) {
        runInAction(() => {
          this.activeChore = response.data;
        });
        console.log('getChore', response.data);

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createChore = async ({
    name,
    points,
    categoryId,
  }: {
    name: string;
    points: number;
    categoryId: DefaultId | null;
  }) => {
    try {
      console.log('createChore', name, points, categoryId);

      const response = await axios.post(ENDPOINTS.createChore.url, {}, { withCredentials: true });
      await sleep(1000);

      if (response) {
        console.log('createChore', response);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editChore = async ({
    choreId,
    name,
    points,
    categoryId,
    isArchived,
  }: {
    choreId: DefaultId;
    name?: string;
    points?: number;
    categoryId?: DefaultId;
    isArchived?: boolean;
  }) => {
    try {
      console.log('editChore', choreId, name, points, categoryId, isArchived);

      // const response = await axios.post(ENDPOINTS.editChore.url, {}, { withCredentials: true });
      await sleep(1000);
      const response = { message: 'ok editChore' };

      if (response) {
        console.log('editChore', response);
        this._rootStore.uiStore.snackbar.open(SnackbarType.choreUpdated);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createCategory = async ({ name, icon }: { name: string; icon: ChoreCategoryIcon }) => {
    try {
      console.log('createCategory', name, icon);

      // const response = await axios.post(ENDPOINTS.createCategory.url, {}, { withCredentials: true });
      await sleep(1000);
      const response = { data: { id: 1 } };

      if (response) {
        console.log('createCategory', response);

        return response.data.id;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createSchedule = async (params: {
    choreId: DefaultId;
    frequency: ScheduleFrequency;
    dateFrom: Date;
    dateTo?: Date;
    users?: UUIDString[];
  }) => {
    try {
      console.log('createSchedule', params);

      // const response = await axios.post(
      //   ENDPOINTS.createSchedule.url,
      //   {},
      //   { withCredentials: true }
      // );

      await sleep(1000);
      const response = { message: 'ok createSchedule' };

      if (response) {
        console.log('createSchedule', response);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default ChoresStore;
