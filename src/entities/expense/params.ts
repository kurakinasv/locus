import { SplitMethod } from 'config/expenses';
import { ExpenseCategory } from 'entities/expenseCategory';
import { Group } from 'entities/group';
import { User } from 'entities/user';

export type ExpensesGetParams = {
  categoryId?: string;
  range?: {
    from: Date;
    to: Date;
  };
};

export type ExpenseCreateParams = {
  name: string;
  amount: number;
  currency: string;
  description?: string | null;
  purchaseDate: Date;
  splitMethod: SplitMethod;
  createdBy: User['id'];
  groupId: Group['id'];
  categoryId?: ExpenseCategory['id'];
};
