import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { CREATE_CATEGORY_OPTION } from 'config/chores';
import {
  ExpenseCategory,
  ExpenseCategoryCreateParams,
  ExpenseCategoryServer,
} from 'entities/expenseCategory';
import RootStore from 'store/RootStore';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class ExpenseCategoriesStore {
  private readonly _rootStore: RootStore;

  categories: ExpenseCategory[] = [];

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

  setCategories = (categories: ExpenseCategory[]) => {
    this.categories = categories;
  };

  getCategories = async () => {
    try {
      const response = await axios.get<ExpenseCategoryServer[]>(
        ENDPOINTS.getExpenseCategories.url,
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.setCategories(response.data);

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createCategory = async (
    params: ExpenseCategoryCreateParams
  ): Promise<ExpenseCategoryServer | void> => {
    try {
      const response = await axios.post<ExpenseCategoryServer>(
        ENDPOINTS.createExpenseCategory.url,
        { name: params.name.trim(), icon: params.icon },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.setCategories([...this.categories, response.data]);

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default ExpenseCategoriesStore;
