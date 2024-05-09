import * as y from 'yup';

import { VALIDATION_MESSAGES } from 'config/form';

export const registerValidationSchema = y.object().shape({
  username: y
    .string()
    .min(5, VALIDATION_MESSAGES.usernameMinLength)
    .max(20, VALIDATION_MESSAGES.usernameMaxLength)
    .required(VALIDATION_MESSAGES.required),
  email: y
    .string()
    .email(VALIDATION_MESSAGES.emailIncorrect)
    .required(VALIDATION_MESSAGES.required),
  password: y
    .string()
    .required(VALIDATION_MESSAGES.required)
    .min(6, VALIDATION_MESSAGES.shortPassword),
  repeatedPassword: y.string().required(VALIDATION_MESSAGES.required),
});

export const loginValidationSchema = y.object().shape({
  email: y
    .string()
    .email(VALIDATION_MESSAGES.emailIncorrect)
    .required(VALIDATION_MESSAGES.required),
  password: y.string().required(VALIDATION_MESSAGES.required),
});
