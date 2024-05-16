import { Currency, SplitMethod } from 'config/expenses';
import { ExpenseCategory } from 'entities/expenseCategory';
import { User } from 'entities/user';
import GroupMemberModel from 'store/models/GroupMemberModel';

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
  categoryId?: ExpenseCategory['id'];
  usersIds: User['id'][];
};

export type ExpenseCreateBody = {
  name: string;
  amount: number;
  description?: string | null;
  purchaseDate: Date;
  categoryId?: ExpenseCategory['id'];
  currency: Currency;
  splitMethod: SplitMethod;
  userGroupIds: GroupMemberModel['id'][];
};
