import { ExpenseCategory } from './client';

export type ExpenseCategoryCreateParams = {
  name: ExpenseCategory['name'];
  icon?: ExpenseCategory['icon'];
};
