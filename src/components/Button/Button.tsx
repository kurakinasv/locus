import { FC, ReactNode, memo } from 'react';

import cn from 'classnames';

import { Spacing } from 'components';
import { SizeEnum } from 'typings/ui';

import { ButtonTheme } from './types';

import s from './Button.module.scss';

type Props = {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  stretched?: boolean;
  size?: SizeEnum;
  theme?: ButtonTheme;
  onClick: VoidFunction;
};

const Button: FC<Props> = ({
  children,
  className,
  icon,
  disabled,
  stretched,
  size = SizeEnum.m,
  theme = ButtonTheme.filled,
  onClick,
}) => {
  return (
    <button
      className={cn(
        s.wrapper,
        stretched && s.wrapper_stretched,
        s[`wrapper_size-${size}`],
        s[`wrapper_theme-${theme}`],
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <div className={s.icon}>{icon}</div>}
      {icon && children && <Spacing horizontal />}
      <div className={s.label}>{children}</div>
    </button>
  );
};

export default memo(Button);
