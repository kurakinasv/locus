import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Header, Sidebar } from 'components';
import { sections } from 'config/sidebar';
import { ScreenTypeProvider, ScreenType } from 'store';

import s from './Main.module.scss';

const Main: FC = () => {
  const location = useLocation();
  const [viewport, setViewport] = useState<ScreenType>('desktop');

  useEffect(() => {
    const width = window.screen.width;
    const isMobile = width < 1000;

    setViewport(isMobile ? 'mobile' : 'desktop');
  }, []);

  const splitLocation = location.pathname.split('/');

  return (
    <ScreenTypeProvider value={viewport}>
      <div className={cn(s.container, viewport === 'mobile' && s.container_mobile)}>
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
    </ScreenTypeProvider>
  );
};

export default Main;
