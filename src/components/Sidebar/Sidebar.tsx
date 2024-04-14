import { FunctionComponent, useCallback } from 'react';

import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { Logo, Spacing } from 'components';
import { routes } from 'config/routes';
import { sections } from 'config/sidebar';
import { useScreenType } from 'store';

import { SidebarButton } from './components/SidebarButton';

import s from './Sidebar.module.scss';

const Sidebar: FunctionComponent = () => {
  const nav = useNavigate();
  const location = useLocation();
  const screen = useScreenType();

  const onProfileClick = useCallback(() => {
    nav(routes.profileSettings.full);
  }, []);

  const isDesktop = screen === 'desktop';
  const currentPage = location.pathname.split('/');

  return (
    <div className={cn(s.container, !isDesktop && s.container_mobile)}>
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
        <div className={s.profile} onClick={onProfileClick}>
          <div className={s.image} />
          <div className={s.wrapper}>
            <div className={s.name}>Светлана Куракина</div>
            <div className={s.email}>svetakurakina2002@gmail.com</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
