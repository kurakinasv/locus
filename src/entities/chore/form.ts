export type FormValues = {
  name: string;
  points: number | '';
  categoryOption: string;
  category?: string;
};

export type FieldConfig =
  | {
      name: keyof FormValues;
      placeholder: string;
      type: 'text';
    }
  | {
      name: keyof FormValues;
      placeholder: string;
      type: 'number';
      min: number;
    }
  | {
      name: FormValues['categoryOption'];
      placeholder: string;
    };

export const fieldsConfigMap = {
  name: {
    name: 'name',
    placeholder: 'Название',
    type: 'text',
  },
  points: {
    name: 'points',
    placeholder: 'Очки за выполнение',
    type: 'number',
    min: 0,
  },
  categoryOption: {
    name: 'categoryOption',
    placeholder: 'Категория',
  },
  category: {
    name: 'category',
    placeholder: 'Название категории',
    type: 'text',
  },
} as const satisfies Record<keyof FormValues, FieldConfig>;

export const initialValues: FormValues = {
  name: '',
  points: '',
  categoryOption: '',
  category: '',
};
