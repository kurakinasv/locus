import * as React from 'react';

import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import { Header, Sidebar } from 'components';
import { sections } from 'config/sidebar';
import { useScreenType } from 'store/context';

import s from './GroupLayout.module.scss';

const GroupLayout: React.FC = () => {
  const location = useLocation();
  const screen = useScreenType();
  const splitLocation = location.pathname.split('/');

  return (
    <div className={cn(s.container, screen === 'mobile' && s.container_mobile)}>
      <Sidebar />
      <div className={s.wrapper}>
        <div className={s.content}>
          <Header
            hasGroup
            title={
              sections.find(({ path }) => path === splitLocation[splitLocation.length - 1])?.title
            }
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GroupLayout;
