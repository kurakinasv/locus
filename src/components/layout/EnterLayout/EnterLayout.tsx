import * as React from 'react';

import { Outlet } from 'react-router-dom';

import { Logo, Spacing } from 'components';

import s from './EnterLayout.module.scss';

const EnterLayout: React.FC = () => {
  return (
    <div className={s.container}>
      <Logo />
      <Spacing size={8} />
      <Outlet />
    </div>
  );
};

export default EnterLayout;
