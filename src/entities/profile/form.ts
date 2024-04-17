enum FieldNames {
  name = 'name',
  surname = 'surname',
  username = 'username',
  email = 'email',
  password = 'password',
}

export const fieldsConfig: {
  name: FieldNames;
  placeholder: string;
  type: 'text' | 'email' | 'password';
  disabled?: boolean;
}[] = [
  {
    name: FieldNames.name,
    placeholder: 'Имя',
    type: 'text',
  },
  {
    name: FieldNames.surname,
    placeholder: 'Фамилия',
    type: 'text',
  },
  {
    name: FieldNames.username,
    placeholder: 'Юзернейм',
    type: 'text',
    disabled: true,
  },
  {
    name: FieldNames.email,
    placeholder: 'Email',
    type: 'email',
    disabled: true,
  },
  {
    name: FieldNames.password,
    placeholder: 'Пароль',
    type: 'password',
    disabled: true,
  },
];

export const initialValues: FieldValues = {
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '********',
  photo: null,
};

export type FieldValues = Record<FieldNames, string> & PhotoType;

type PhotoType = {
  photo: null | File;
};
