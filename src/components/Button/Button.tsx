import { FC, ReactNode, memo } from 'react';
import cn from 'classnames';

import { Spacing } from 'components';

import s from './Button.module.scss';

type Props = {
  children?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  stretched?: boolean;
  onClick: VoidFunction;
};

const Button: FC<Props> = ({ children, icon, disabled, stretched, onClick }) => {
  return (
    <button
      className={cn(s.wrapper, stretched && s.wrapper_stretched)}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <div className={s.icon}>{icon}</div>}
      {icon && children && <Spacing size={8} horizontal />}
      <div className={s.label}>{children}</div>
    </button>
  );
};

export default memo(Button);
