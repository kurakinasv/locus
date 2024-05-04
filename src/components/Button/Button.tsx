import React, { ButtonHTMLAttributes, FC, MouseEvent, ReactNode, memo } from 'react';

import cn from 'classnames';

import { Spacing } from 'components';
import { SizeEnum } from 'typings/ui';

import { ButtonTheme } from './types';

import s from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  stretched?: boolean;
  size?: SizeEnum;
  theme?: ButtonTheme;
  onClick?: ((e: MouseEvent<HTMLButtonElement>) => void) | VoidFunction;
};

const Button: FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      icon,
      disabled,
      loading,
      stretched,
      size = SizeEnum.m,
      theme = ButtonTheme.filled,
      onClick,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <button
        {...props}
        className={cn(
          s.wrapper,
          stretched && s.wrapper_stretched,
          s[`wrapper_size-${size}`],
          s[`wrapper_theme-${theme}`],
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        ref={forwardedRef}
      >
        {icon && <div className={s.icon}>{icon}</div>}
        {icon && children && <Spacing horizontal />}
        <span className={s.label}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default memo(Button);
