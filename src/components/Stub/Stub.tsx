import * as React from 'react';

import cn from 'classnames';

import { SizeEnum } from 'typings/ui';

import EmptyIcon from 'img/icons/empty.svg?react';

import s from './Stub.module.scss';

const Stub: React.FC<{ size?: SizeEnum.s | SizeEnum.m }> = ({ size = SizeEnum.m }) => {
  return (
    <div className={cn(s.stub, s[`stub_size-${size}`])}>
      <EmptyIcon className={s.stub__icon} />
    </div>
  );
};

export default Stub;
