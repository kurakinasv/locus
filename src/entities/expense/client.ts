import { ExpenseStatus, SplitMethod } from 'config/expenses';
import { ExpenseCategory } from 'entities/expenseCategory';
import { Group } from 'entities/group';
import { User } from 'entities/user';
import { DateString, DefaultId } from 'typings/api';

export type ExpenseClient = {
  id: DefaultId;
  name: string;
  amount: number;
  currency: string;
  description: string | null;
  purchaseDate: DateString;
  splitMethod: SplitMethod;
  status: ExpenseStatus;
  createdBy: User['id'];
  groupId: Group['id'];
  categoryId: ExpenseCategory['id'] | null;
};
