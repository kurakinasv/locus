import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { ENDPOINTS } from 'config/api';
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

  createCategory = async (params: ExpenseCategoryCreateParams): Promise<void> => {
    try {
      const response = await axios.post<ExpenseCategoryServer>(
        ENDPOINTS.createExpenseCategory.url,
        { name: params.name.trim() },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.setCategories([...this.categories, response.data]);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default ExpenseCategoriesStore;
