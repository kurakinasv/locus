import * as y from 'yup';

import { VALIDATION_MESSAGES } from 'config/form';

export const addChoreValidationSchema = y.object().shape({
  name: y.string().required(VALIDATION_MESSAGES.required),
  points: y.number().min(0).integer(VALIDATION_MESSAGES.integerValues),
  category: y.string().max(30, VALIDATION_MESSAGES.categoryNameMaxLength),
});
