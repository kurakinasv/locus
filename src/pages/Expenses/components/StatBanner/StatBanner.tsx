import * as React from 'react';

import cn from 'classnames';

import RubleSVG from 'img/icons/ruble.svg?react';

import s from './StatBanner.module.scss';

type Props = {
  value: number;
  description: React.ReactNode;
  color?: 'turquoise' | 'purple' | 'orange';
};

const StatBanner: React.FC<Props> = ({ value, description, color = 'turquoise' }) => {
  return (
    <div className={cn(s.banner, s[`banner_color-${color}`])}>
      <span className={s.price}>
        {(value ?? 0).toLocaleString('ru-RU')}
        <span className={s.currency}>
          <RubleSVG />
        </span>
      </span>
      <span className={s.description}>{description}</span>
    </div>
  );
};

export default StatBanner;
