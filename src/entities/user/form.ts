type FieldNamesLogin = {
  email: string;
  password: string;
};

type FieldNames = FieldNamesLogin & {
  username: string;
  repeatedPassword: string;
};

type FieldConfig<T extends keyof FieldNamesLogin | keyof FieldNames> = {
  name: T;
  placeholder: string;
  type: 'text' | 'email' | 'password';
};

export const loginFieldsConfig: FieldConfig<keyof FieldNamesLogin>[] = [
  {
    name: 'email',
    placeholder: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    placeholder: 'Пароль',
    type: 'password',
  },
];

export const registerFieldsConfig: FieldConfig<keyof FieldNames>[] = [
  {
    name: 'username',
    placeholder: 'Юзернейм',
    type: 'text',
  },
  ...loginFieldsConfig,
  {
    name: 'repeatedPassword',
    placeholder: 'Введите пароль повторно',
    type: 'password',
  },
];

export const loginInitialValues: FieldValuesLogin = {
  email: '',
  password: '',
};

export const registerInitialValues: FieldValues = {
  ...loginInitialValues,
  username: '',
  repeatedPassword: '',
};

export type FieldValues = Record<keyof FieldNames, string>;
export type FieldValuesLogin = Record<keyof FieldNamesLogin, string>;
