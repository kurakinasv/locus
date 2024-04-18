import * as y from 'yup';

export const validationSchema = y.object().shape({
  name: y.string(),
  surname: y.string(),
  username: y
    .string()
    .min(8, 'Минимальное число символов – 8')
    .max(20, 'Минимальное число символов – 20')
    .required('Это поле обязательно'),
  email: y.string().email('Неверный адрес электронной почты').required('Это поле обязательно'),
  password: y
    .string()
    .required('Это поле обязательно')
    .min(6, 'Пароль слишком короткий - должно быть не менее 6 символов'),
});
