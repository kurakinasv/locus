import { ChangeEvent, FC, InputHTMLAttributes, SVGProps, memo } from 'react';

import cn from 'classnames';
import { FieldInputProps } from 'formik';

import { PropsWithClassName } from 'typings/props';

import s from './Input.module.scss';

type InputProps = PropsWithClassName & {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
  stretched?: boolean;
  touched?: boolean;
  errorMessage?: string;
  field?: FieldInputProps<string>;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
  placeholder,
  disabled = false,
  value = '',
  icon: Icon = null,
  name = '',
  touched = false,
  errorMessage = '',
  className,
  onChange,
  field: formikField,
  form,
  ...props
}) => {
  return (
    <div className={cn(s.wrapper, className)}>
      {Icon && <Icon className={s.icon} />}
      <input
        className={cn(s.input, errorMessage && s.input_error)}
        value={value ?? undefined}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        {...formikField}
        {...props}
      />
      {errorMessage && touched && <div className={s.error}>{errorMessage}</div>}
    </div>
  );
};

export default memo(Input);
