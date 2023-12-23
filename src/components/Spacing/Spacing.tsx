import { CSSProperties, FC } from 'react';
import cn from 'classnames';

import s from './Spacing.module.scss';

type Props = {
  size: number;
  horizontal?: boolean;
  className?: string;
  stretched?: boolean;
};

const Spacing: FC<Props> = ({ size, horizontal = false, className = '', stretched = false }) => {
  return (
    <div
      className={cn(
        s.wrapper,
        horizontal ? s.horizontal : s.vertical,
        stretched && s.stretched,
        className
      )}
      style={{ '--size': size } as CSSProperties}
    />
  );
};

export default Spacing;
