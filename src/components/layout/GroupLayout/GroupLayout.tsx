import { useMemo } from 'react';

import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import { Header, Sidebar, Spacing } from 'components';
import { sections } from 'config/sidebar';
import { useScreenType } from 'store/context';

import s from './GroupLayout.module.scss';

const GroupLayout: React.FC = () => {
  const location = useLocation();
  const screen = useScreenType();
  const isMobile = screen === 'mobile';
  const splitLocation = location.pathname.split('/');

  const title = useMemo(() => {
    return sections.find(({ path }) => path === splitLocation.at(-1))?.title;
  }, [splitLocation]);

  return (
    <div className={cn(s.container, isMobile && s.container_mobile)}>
      <Sidebar />
      <div className={s.wrapper}>
        <div className={s.content}>
          <Header hasGroup title={title} />
          <Spacing size={isMobile ? 3 : 5} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GroupLayout;
