import * as React from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues } from 'react-hook-form';

import s from './ErrorMessageLabel.module.scss';

type Props =
  | {
      name: string;
      errors: FieldErrors<FieldValues>;
      message: React.ReactNode;
      formik?: false;
    }
  | {
      name: string;
      errors?: FieldErrors<FieldValues>;
      message: React.ReactNode;
      formik: true;
    };

const ErrorMessageLabel: React.FC<Props> = ({ errors, message, name, formik = false }) => {
  return formik === true ? (
    <p className={s.error}>{message}</p>
  ) : (
    <ErrorMessage errors={errors} name={name} render={() => <p className={s.error}>{message}</p>} />
  );
};

export default ErrorMessageLabel;
