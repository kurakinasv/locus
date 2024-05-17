import axios, { AxiosResponse } from 'axios';
import { compareAsc, format } from 'date-fns';
import { makeAutoObservable, runInAction, toJS } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { axiosInstance } from 'config/api/requests';
import { SnackbarType } from 'config/snackbar';
import { DebtsClient, ExpenseClient, ExpenseWithDebt } from 'entities/expense';
import {
  DebtsResponse,
  ExpenseCreateBody,
  ExpenseCreateParams,
  ExpenseCreateResponse,
  ExpenseEditBody,
  ExpenseEditParams,
  ExpensesGetParams,
} from 'entities/expense/params';
import { ExpenseServer } from 'entities/expense/server';
import { GroupMemberClient } from 'entities/groupMember';
import MetaModel from 'store/models/MetaModel';
import RootStore from 'store/RootStore';
import { DateString, UUIDString } from 'typings/api';
import { cutTimezone } from 'utils/formatDate';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class ExpensesStore {
  private readonly _rootStore: RootStore;

  readonly meta = {
    getExpenses: new MetaModel(),
  };

  activeExpense: ExpenseClient | null = null;
  groupExpenses: ExpenseClient[] = [];
  debts: DebtsClient | null = null;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  get expensesMonthMap(): Record<DateString, ExpenseClient[]> {
    return this.groupExpenses.reduce(
      (acc, expense) => {
        const expenseDate = new Date(expense.purchaseDate);
        const dateKey = format(new Date(expenseDate), 'yyyy-MM');

        let restAcc = [] as ExpenseClient[];

        if (Object.keys(acc).length) {
          restAcc = acc[dateKey] ?? [];
        }

        return {
          ...acc,
          [dateKey]: [...restAcc, expense],
        };
      },
      {} as Record<DateString, ExpenseClient[]>
    );
  }

  get expenseById() {
    return this.groupExpenses.reduce(
      (acc, expense) => {
        return {
          ...acc,
          [expense.id]: expense,
        };
      },
      {} as Record<ExpenseClient['id'], ExpenseClient>
    );
  }

  get usersDebtsTotalAmounts() {
    const debts = this.debts
      ? Object.entries(this.debts).reduce(
          (acc, [userId, userDebts]) => {
            return {
              ...acc,
              [userId]: Object.values(userDebts).reduce((acc, debt) => acc + debt, 0),
            };
          },
          {} as Record<UUIDString, number>
        )
      : {};

    return debts;
  }

  /** Current user's debts sorted by date and filtered by month */
  get userDebtsMonthMap(): Record<DateString, ExpenseWithDebt[]> {
    const userId = this._rootStore.userStore.user?.id;

    if (!(this.debts && userId && Object.keys(this.debts).includes(userId))) {
      return {};
    }

    const userDebts = this.debts[userId];

    // [ { [expenseId]: debt-amount }, ... ]
    const debts = Object.entries(userDebts).reduce(
      (acc, [expenseId, debtAmount]) => {
        const expense = this.expenseById[Number(expenseId)];

        const expenseDate = new Date(expense.purchaseDate);
        const dateKey = format(new Date(expenseDate), 'yyyy-MM');

        let restAcc = [] as ExpenseWithDebt[];

        if (Object.keys(acc).length) {
          restAcc = acc[dateKey] ?? [];
        }

        return {
          ...acc,
          [dateKey]: [...restAcc, { ...expense, debtAmount }],
        };
      },
      {} as Record<DateString, ExpenseWithDebt[]>
    );

    const newDebts = {} as Record<string, ExpenseWithDebt[]>;

    for (const [date, expensesArray] of Object.entries(debts)) {
      newDebts[date] = [...expensesArray].sort((a, b) => {
        return compareAsc(new Date(b.purchaseDate), new Date(a.purchaseDate));
      });
    }

    return newDebts;
  }

  setExpenses = (expenses: ExpenseClient[]) => {
    this.groupExpenses = expenses;
  };

  getExpense = async (expenseId: ExpenseClient['id']): Promise<ExpenseClient | void> => {
    try {
      const response = await axiosInstance.get<ExpenseServer>(
        ENDPOINTS.getExpense.getUrl(String(expenseId)),
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        const expense = this.normalizeExpense(response.data);

        runInAction(() => {
          this.activeExpense = expense;
        });

        return expense;
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  getGroupExpenses = async (params?: ExpensesGetParams) => {
    try {
      this.meta.getExpenses.startLoading();

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

      const response = await axiosInstance.get<ExpenseServer[]>(
        ENDPOINTS.getGroupExpenses.getUrl(encodeURI(query)),
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.setExpenses(response.data.map(this.normalizeExpense));
        this.meta.getExpenses.stopLoading();

        return response.data;
      }

      this.meta.getExpenses.stopLoading();
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  createExpense = async ({ usersIds, ...params }: ExpenseCreateParams) => {
    try {
      const response = await axios.post<
        ExpenseCreateResponse,
        AxiosResponse<ExpenseCreateResponse>,
        ExpenseCreateBody
      >(
        ENDPOINTS.createExpense.url,
        {
          ...params,
          currency: 'RUB',
          splitMethod: 'equally',
          purchaseDate: cutTimezone(params.purchaseDate).toISOString(),
          userGroupIds: usersIds.map(
            (m) => this._rootStore.groupMemberStore.userGroupIdByUserId[m]
          ),
        },
        {
          withCredentials: true,
        }
      );

      if (responseIsOk(response)) {
        this.setExpenses([...this.groupExpenses, this.normalizeExpense(response.data.expense)]);

        this._rootStore.uiStore.snackbar.open(SnackbarType.expenseCreated);
      }

      return response.data;
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  editExpense = async ({ id, ...expenseData }: ExpenseEditParams) => {
    try {
      const response = await axios.put<
        ExpenseServer[],
        AxiosResponse<ExpenseServer[]>,
        ExpenseEditBody
      >(
        ENDPOINTS.editExpense.getUrl(String(id)),
        {
          ...expenseData,
          categoryId: expenseData.categoryId,
          purchaseDate: expenseData.purchaseDate
            ? cutTimezone(expenseData.purchaseDate).toISOString()
            : undefined,
        },
        {
          withCredentials: true,
        }
      );

      if (responseIsOk(response)) {
        this.setExpenses(response.data.map(this.normalizeExpense));
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

  getUsersDebts = async () => {
    try {
      const response = await axios.get<DebtsResponse>(ENDPOINTS.getUsersDebts.url, {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        runInAction(() => {
          this.debts = response.data;
        });
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  normalizeExpense = (expense: ExpenseServer): ExpenseClient => {
    const category = this._rootStore.expenseCategoriesStore.getById(expense.categoryId);
    const userGroupIds: GroupMemberClient['id'][] = expense.userGroups.map(({ id }) => id);

    return { ...expense, category, userGroupIds };
  };
}

export default ExpensesStore;
