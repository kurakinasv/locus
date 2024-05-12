import * as React from 'react';

import EmptyIcon from 'img/icons/empty.svg?react';

import s from './Stub.module.scss';

const Stub: React.FC = () => {
  return (
    <div className={s.stub}>
      <EmptyIcon className={s.stub__icon} />
    </div>
  );
};

export default Stub;
