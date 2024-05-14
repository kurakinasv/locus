import { UUIDString } from 'typings/api';

export type CreateFormValues = {
  name: string;
  category: string;
  description: string;
  amount: number;
  purchaseDate: Date;
  // userIds: UUIDString;
};

export type EditFormValues = {
  name: string;
  category: string;
  description: string;
  amount: number;
  purchaseDate: Date;
  userIds: UUIDString;
};

export type DebtFormValues = {
  name: string;
  category: string;
  description: string;
  amount: number;
  purchaseDate: Date;
  userIds: UUIDString;
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
