import axios, { AxiosResponse } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { axiosInstance } from 'config/api/requests';
import { SnackbarType } from 'config/snackbar';
import { ExpenseClient } from 'entities/expense';
import { ExpenseCreateBody, ExpenseCreateParams, ExpensesGetParams } from 'entities/expense/params';
import RootStore from 'store/RootStore';
import { cutTimezone } from 'utils/formatDate';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class ExpensesStore {
  private readonly _rootStore: RootStore;

  activeExpense: ExpenseClient | null = null;
  groupExpenses: ExpenseClient[] = [];

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  setExpenses = (expenses: ExpenseClient[]) => {
    this.groupExpenses = expenses;
  };

  getExpense = async (expenseId: ExpenseClient['id']) => {
    try {
      const response = await axios.get<ExpenseClient>(
        ENDPOINTS.getExpense.getUrl(String(expenseId)),
        {
          withCredentials: true,
        }
      );

      if (responseIsOk(response)) {
        runInAction(() => {
          this.activeExpense = response.data;
        });

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getGroupExpenses = async (params: ExpensesGetParams) => {
    try {
      let query = '';

      if (params?.categoryId) {
        const sym = query ? '&' : '?';
        query = `${query}${sym}categoryId=${params.categoryId}`;
      }

      if (params?.range) {
        const { from, to } = params.range;

        const sym = query ? '&' : '?';

        const dateFrom = from ? cutTimezone(from).toISOString() : '';
        const dateTo = to ? cutTimezone(to).toISOString() : '';

        query = `${query}${sym}from=${dateFrom}&to=${dateTo}`;
      }

      const response = await axiosInstance.get<ExpenseClient[]>(
        ENDPOINTS.getGroupExpenses.getUrl(encodeURI(query)),
        {
          withCredentials: true,
        }
      );

      if (responseIsOk(response)) {
        this.setExpenses(response.data);

        return response.data;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createExpense = async ({ usersIds, ...params }: ExpenseCreateParams) => {
    try {
      const response = await axios.post<
        ExpenseClient,
        AxiosResponse<ExpenseClient>,
        ExpenseCreateBody
      >(
        ENDPOINTS.createExpense.url,
        {
          ...params,
          currency: 'RUB',
          splitMethod: 'equally',
          userGroupIds: usersIds.map(
            (m) => this._rootStore.groupMemberStore.userGroupIdByUserId[m]
          ),
        },
        {
          withCredentials: true,
        }
      );

      if (responseIsOk(response)) {
        this.setExpenses([...this.groupExpenses, response.data]);
        this._rootStore.uiStore.snackbar.open(SnackbarType.expenseCreated);
      }

      return response.data;
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editExpense = async ({ id, ...expenseData }: ExpenseClient) => {
    try {
      const response = await axios.put<ExpenseClient[]>(
        ENDPOINTS.editExpense.getUrl(String(id)),
        expenseData,
        {
          withCredentials: true,
        }
      );

      if (responseIsOk(response)) {
        this.setExpenses(response.data);
        this._rootStore.uiStore.snackbar.open(SnackbarType.scheduleEdited);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  deleteExpense = async (id: ExpenseClient['id']) => {
    try {
      const response = await axios.delete<{ message: string }>(
        ENDPOINTS.deleteExpense.getUrl(String(id)),
        {
          withCredentials: true,
        }
      );

      if (responseIsOk(response)) {
        const filteredExpenses = this.groupExpenses.filter((expense) => expense.id !== id);
        this.setExpenses(filteredExpenses);
        this._rootStore.uiStore.snackbar.open(SnackbarType.expenseDeleted);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default ExpensesStore;
