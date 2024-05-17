import { FieldValues } from 'react-hook-form';

export type CreateFormValues = FieldValues & {
  name: string;
  category: string;
  description: string;
  amount: number;
  purchaseDate: Date;
  categoryName: string;
};

export type EditFormValues = FieldValues & {
  name: string;
  category: string;
  description: string;
  amount: number;
  purchaseDate: Date;
};

export type DebtFormValues = FieldValues & {
  name: string;
  category: string;
  description: string;
  amount: number;
  purchaseDate: Date;
};

type FieldConfig =
  | {
      name: string;
      placeholder: string;
      type: 'text';
    }
  | {
      name: string;
      placeholder: string;
      type: 'number';
      min: number;
    };

export const addExpenseMap = {
  name: {
    name: 'name',
    placeholder: 'Название',
    type: 'text',
  },
  category: {
    name: 'category',
    placeholder: 'Категория',
    type: 'text',
  },
  categoryName: {
    name: 'categoryName',
    placeholder: 'Введите название категории',
    type: 'text',
  },
  description: {
    name: 'description',
    placeholder: 'Описание',
    type: 'text',
  },
  amount: {
    name: 'amount',
    placeholder: 'Сумма',
    type: 'number',
    min: 0,
  },
  purchaseDate: {
    name: 'purchaseDate',
    placeholder: 'Дата оплаты',
    type: 'text',
  },
} as const satisfies Record<keyof CreateFormValues, FieldConfig>;
