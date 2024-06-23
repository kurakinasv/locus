import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api/endpoints';
import { CREATE_CATEGORY_OPTION } from 'config/chores';
import { ChoreCategory, choreCategoryIconsNames } from 'entities/chore';
import { CreateChoreCategory } from 'entities/choreCategory/params';
import MetaModel from 'store/models/MetaModel';
import RootStore from 'store/RootStore';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class ChoreCategoriesStore {
  private readonly _rootStore: RootStore;

  readonly getCategoriesMeta = new MetaModel();
  readonly createCategoryMeta = new MetaModel();

  categories: ChoreCategory[] = [];

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  get categoriesOptions() {
    return this.categories.map((cat) => ({
      label: cat.name,
      value: String(cat.id),
    }));
  }

  get categoriesOptionsWithCreate() {
    return [CREATE_CATEGORY_OPTION, ...this.categoriesOptions];
  }

  getCategories = async () => {
    try {
      this.getCategoriesMeta.startLoading();

      const response = await axios.get(ENDPOINTS.getChoreCategories.url, { withCredentials: true });

      if (response.data) {
        runInAction(() => {
          this.categories = response.data;
        });
      }

      this.getCategoriesMeta.stopLoading();
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createCategory = async (params: CreateChoreCategory): Promise<ChoreCategory | void> => {
    try {
      this.createCategoryMeta.startLoading();

      let icon = params.icon;

      if (icon && !choreCategoryIconsNames.includes(icon)) {
        icon = 'other';
      }

      const response = await axios.post(
        ENDPOINTS.createChoreCategory.url,
        { name: params.name.trim(), icon },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        runInAction(() => {
          this.categories = [...this.categories, response.data];
        });

        this.createCategoryMeta.stopLoading();

        return response.data;
      }

      this.createCategoryMeta.stopLoading();
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default ChoreCategoriesStore;
