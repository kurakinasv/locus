import * as React from 'react';

import RubleSVG from 'img/icons/ruble.svg?react';

import s from './Price.module.scss';

const Price: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.price}>
      {children}
      <div className={s.currency}>
        <RubleSVG />
      </div>
    </div>
  );
};

export default Price;
