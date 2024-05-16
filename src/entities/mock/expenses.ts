import { ExpenseClient } from 'entities/expense';
import { ExpenseCategory } from 'entities/expenseCategory';

import { MOCK_USERS } from './user';

export const MOCK_EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    id: 1,
    name: 'Интернет, связь',
    icon: 'other',
    isArchived: false,
    groupId: '1',
  },
];

export const MOCK_EXPENSES: ExpenseClient[] = [
  {
    id: 1,
    purchaseDate: new Date().toLocaleDateString(),
    categoryId: MOCK_EXPENSE_CATEGORIES[0].id,
    description:
      'Небольшое или большое описание этой траты небольшое или большое описание этой траты',
    amount: 500,
    createdBy: MOCK_USERS[0].id,
    currency: 'RUB',
    groupId: '1',
    name: 'Интернет, связь',
    splitMethod: 'equally',
    status: 'pending',
  },
  {
    id: 2,
    purchaseDate: new Date().toLocaleDateString(),
    categoryId: MOCK_EXPENSE_CATEGORIES[0].id,
    description: 'Небольшое или большое описание этой траты',
    amount: 500,
    createdBy: MOCK_USERS[0].id,
    currency: 'RUB',
    groupId: '1',
    name: 'Интернет, связь',
    splitMethod: 'equally',
    status: 'pending',
  },
  {
    id: 3,
    purchaseDate: new Date().toLocaleDateString(),
    categoryId: MOCK_EXPENSE_CATEGORIES[0].id,
    description: 'Небольшое или большое описание этой траты',
    amount: 500,
    createdBy: MOCK_USERS[0].id,
    currency: 'RUB',
    groupId: '1',
    name: 'Интернет, связь',
    splitMethod: 'equally',
    status: 'pending',
  },
];
