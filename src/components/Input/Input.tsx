import { ChangeEvent, FC, InputHTMLAttributes, SVGProps, memo } from 'react';

import cn from 'classnames';

import { PropsWithClassName } from 'typings/props';

import s from './Input.module.scss';

type InputProps = PropsWithClassName & {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
  stretched?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
  placeholder,
  disabled = false,
  value = '',
  icon: Icon = null,
  className,
  onChange,
}) => {
  return (
    <div className={cn(s.wrapper, className)}>
      {Icon && <Icon className={s.icon} />}
      <input
        className={s.input}
        value={value ?? undefined}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(Input);
