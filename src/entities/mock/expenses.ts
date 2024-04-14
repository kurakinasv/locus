import { ExpenseItem } from 'entities/expense';

export const MOCK_EXPENSES: ExpenseItem[] = [
  {
    id: 1,
    date: new Date().toLocaleDateString(),
    category: 'Интернет, связь',
    description:
      'Небольшое или большое описание этой траты небольшое или большое описание этой траты',
    price: 500,
  },
  {
    id: 2,
    date: new Date().toLocaleDateString(),
    category: 'Интернет, связь',
    description: 'Небольшое или большое описание этой траты',
    price: 500,
  },
  {
    id: 3,
    date: new Date().toLocaleDateString(),
    category: 'Интернет, связь',
    description: 'Небольшое или большое описание этой траты',
    price: 500,
  },
];
