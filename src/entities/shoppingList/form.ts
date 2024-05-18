import { FieldValues } from 'react-hook-form';

export type CreateFormValues = FieldValues & {
  name: string;
  date?: Date;
};

export type EditFormValues = FieldValues & {
  name: string;
  date?: Date;
};

type FieldConfig = {
  name: string;
  placeholder: string;
  type: 'text';
};

export const addListMap = {
  name: {
    name: 'name',
    placeholder: 'Название',
    type: 'text',
  },
  date: {
    name: 'date',
    placeholder: 'Дата',
    type: 'text',
  },
} as const satisfies Record<keyof CreateFormValues, FieldConfig>;
