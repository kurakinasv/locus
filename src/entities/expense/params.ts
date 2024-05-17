import { Currency, SplitMethod } from 'config/expenses';
import { ExpenseCategory } from 'entities/expenseCategory';
import { User } from 'entities/user';
import { UserExpenseServer } from 'entities/userExpense';
import GroupMemberModel from 'store/models/GroupMemberModel';
import { DateString } from 'typings/api';

import { ExpenseClient } from '.';
import { ExpenseServer } from './server';

export type ExpensesGetParams = {
  categoryId?: string;
  range?: {
    from: Date;
    to: Date;
  };
};

// todo: add currency and splitMethod
export type ExpenseCreateParams = {
  name: string;
  amount: number;
  description?: string | null;
  purchaseDate: Date;
  categoryId: ExpenseCategory['id'];
  usersIds: User['id'][];
};

export type ExpenseCreateBody = {
  name: string;
  amount: number;
  description?: string | null;
  purchaseDate: DateString;
  categoryId?: ExpenseCategory['id'];
  currency: Currency;
  splitMethod: SplitMethod;
  userGroupIds: GroupMemberModel['id'][];
};

export type ExpenseCreateResponse = {
  expense: ExpenseServer;
  userExpenses: UserExpenseServer[];
};

// todo: add currency and splitMethod
export type ExpenseEditParams = {
  id: ExpenseClient['id'];
  name?: string;
  amount?: number;
  description?: string | null;
  purchaseDate?: Date;
  categoryId?: ExpenseCategory['id'];
  usersIds?: User['id'][];
};

export type ExpenseEditBody = {
  name?: string;
  amount?: number;
  description?: string | null;
  purchaseDate?: DateString;
  categoryId?: ExpenseCategory['id'];
  currency?: Currency;
  splitMethod?: SplitMethod;
  userGroupIds?: GroupMemberModel['id'][];
};
