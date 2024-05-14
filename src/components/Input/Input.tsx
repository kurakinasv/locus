import { ChangeEvent, FC, InputHTMLAttributes, SVGProps, memo } from 'react';

import cn from 'classnames';
import { FieldInputProps } from 'formik';

import { Spacing } from 'components/Spacing';
import { PropsWithClassName } from 'typings/props';

import CloseIcon from 'img/icons/close.svg?react';

import s from './Input.module.scss';

type InputProps = PropsWithClassName & {
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
  stretched?: boolean;
  touched?: boolean;
  errorMessage?: string;
  label?: React.ReactNode;
  hideCloseIcon?: boolean;
  clearSearch?: VoidFunction;
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
  label,
  className,
  hideCloseIcon = false,
  onChange,
  clearSearch,
  field: formikField,
  form,
  ...props
}) => {
  return (
    <div className={cn(s.wrapper, className)}>
      <div className={s['input-wrapper']}>
        {!hideCloseIcon && clearSearch && !!value ? (
          <CloseIcon className={s['close-icon']} onClick={clearSearch} />
        ) : Icon ? (
          <Icon className={s.icon} />
        ) : undefined}
        <input
          className={cn(s.input, errorMessage && touched && s.input_error)}
          value={value ?? undefined}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          {...formikField}
          {...props}
        />
      </div>
      {errorMessage && touched && <div className={s.error}>{errorMessage}</div>}
      {label && !(errorMessage && touched) && (
        <>
          <Spacing size={0.4} />
          <label className={s.label} htmlFor={name}>
            {label}
          </label>
        </>
      )}
    </div>
  );
};

export default memo(Input);
