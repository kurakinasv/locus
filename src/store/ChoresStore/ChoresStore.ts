import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { CREATE_CATEGORY_OPTION, ScheduleFrequency } from 'config/chores';
import { Chore, ChoreCategory, ChoreCategoryIcon } from 'entities/chore';
import RootStore from 'store/RootStore';
import { DefaultId, UUIDString } from 'typings/api';
import { getErrorMsg } from 'utils/getErrorMsg';
import { sleep } from 'utils/sleep';

class ChoresStore {
  private readonly _rootStore: RootStore;

  chores: Chore[] = [];

  categories: ChoreCategory[] = [];

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
