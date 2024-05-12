import * as React from 'react';

import SpinnerIcon from 'img/common/spinner.svg?react';

import s from './Spinner.module.scss';

const Spinner: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <SpinnerIcon className={s.spinner} />
    </div>
  );
};

export default Spinner;
