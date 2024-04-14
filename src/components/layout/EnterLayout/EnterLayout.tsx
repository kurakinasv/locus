import * as React from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from 'components/Header';

import s from './EnterLayout.module.scss';

const EnterLayout: React.FC = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <Header hasGroup={false} />
        </div>
        <div className={s.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EnterLayout;
