import * as React from 'react';

import cn from 'classnames';

import { CommonProps } from 'typings/props';
import { SizeEnum } from 'typings/ui';

import RubleSVG from 'img/icons/ruble.svg?react';

import s from './Price.module.scss';

type Props = CommonProps & {
  color?: 'black' | 'red' | 'green';
  size?: SizeEnum.s | SizeEnum.m | SizeEnum.l;
};

const Price: React.FC<Props> = ({ children, color = 'black', size = 'm', className }) => {
  return (
    <div className={cn(s.price, s[`price_color-${color}`], s[`price_size-${size}`], className)}>
      {children}
      <div className={s.currency}>
        <RubleSVG />
      </div>
    </div>
  );
};

export default Price;
