import { FunctionComponent, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Logo, Spacing } from 'components';
import { routes } from 'config/routes';
import { sections } from 'config/sidebar';
import { useScreenType } from 'store';

import { SidebarButton } from './components';

import s from './Sidebar.module.scss';

const Sidebar: FunctionComponent = () => {
  const nav = useNavigate();
  const location = useLocation();
  const screen = useScreenType();

  const onGroupClick = useCallback(() => {
    nav(routes.groupSettings.full);
  }, []);

  const isDesktop = screen === 'desktop';
  const currentPage = location.pathname.split('/');

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {isDesktop && (
          <div>
            <Logo theme="alt" />
            <Spacing size={9} />
          </div>
        )}
        <div className={s.buttonsList}>
          {sections.map((btn) => (
            <div key={btn.id}>
              <Spacing size={1} horizontal={!isDesktop} />
              <SidebarButton
                key={btn.id}
                path={btn.path}
                SidebarIcon={btn.icon}
                isActive={btn.path === currentPage[currentPage.length - 1]}
                withText={isDesktop}
              >
                {btn.title}
              </SidebarButton>
            </div>
          ))}
        </div>
      </div>
      {isDesktop && (
        <div className={s.group} onClick={onGroupClick}>
          <div className={s.image} />
          <div className={s.name}>Название группы</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
