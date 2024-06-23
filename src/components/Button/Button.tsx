import React, { ButtonHTMLAttributes, FC, MouseEvent, ReactNode, memo } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import cn from 'classnames';

import { Spacing } from 'components';
import { SizeEnum } from 'typings/ui';

import { ButtonTheme } from './types';

import s from './Button.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  after?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  stretched?: boolean;
  size?: SizeEnum;
  theme?: ButtonTheme;
  opensModal?: boolean;
  closesModal?: boolean;
  onClick?: ((e: MouseEvent<HTMLButtonElement>) => void) | VoidFunction;
};

const Button: FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      className,
      icon,
      after,
      disabled,
      loading,
      stretched,
      size = SizeEnum.m,
      theme = ButtonTheme.filled,
      opensModal = false,
      closesModal = false,
      type = 'button',
      onClick,
      ...props
    },
    forwardedRef
  ) => {
    const wrapperStyles = cn(
      s.wrapper,
      stretched && s.wrapper_stretched,
      s[`wrapper_size-${size}`],
      s[`wrapper_theme-${theme}`],
      className
    );

    const buttonProps = {
      ...props,
      type,
      className: wrapperStyles,
      disabled: disabled || loading,
      ref: forwardedRef,
      onClick: onClick,
    };

    const buttonContent = (
      <>
        {icon && <div className={s.icon}>{icon}</div>}
        {icon && children && <Spacing horizontal />}
        <span className={s.label}>{children}</span>
        {after && <Spacing horizontal />}
        {after && <div className={s.icon}>{after}</div>}
      </>
    );

    if (opensModal || closesModal) {
      const DialogTag = opensModal ? Dialog.Trigger : closesModal ? Dialog.Close : 'button';

      return (
        <DialogTag {...buttonProps}>
          <span className={s['defalt-wrapper']}>{buttonContent}</span>
        </DialogTag>
      );
    }

    return <button {...buttonProps}>{buttonContent}</button>;
  }
);

Button.displayName = 'Button';

export default memo(Button);
