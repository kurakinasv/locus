import { FC, useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import { ScreenTypeProvider, ScreenType } from 'store';

// import s from './Main.module.scss';

const Main: FC = () => {
  const [viewport, setViewport] = useState<ScreenType>('desktop');

  useEffect(() => {
    const width = window.screen.width;
    const isMobile = width < 1000;

    setViewport(isMobile ? 'mobile' : 'desktop');
  }, []);

  return (
    <ScreenTypeProvider value={viewport}>
      <Outlet />
    </ScreenTypeProvider>
  );
};

export default Main;
