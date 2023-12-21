import { CSSProperties, FC } from 'react';
import cn from 'classnames';

import s from './Spacing.module.scss';

type Props = {
  size: number;
  horizontal?: boolean;
  className?: string;
};

const Spacing: FC<Props> = ({ size, horizontal = false, className = '' }) => {
  return (
    <div
      className={cn(s.wrapper, horizontal ? s.horizontal : s.vertical, className)}
      style={{ '--size': size } as CSSProperties}
    />
  );
};

export default Spacing;
