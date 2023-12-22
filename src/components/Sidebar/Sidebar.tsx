import { FunctionComponent, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Logo, Spacing } from 'components';
import { RouterPaths } from 'config/routes';
import { sections } from 'config/sidebar';
import { useScreenType, useAuthContext } from 'store';

import { SidebarButton } from './components/SidebarButton';

import s from './Sidebar.module.scss';

const Sidebar: FunctionComponent = () => {
  const nav = useNavigate();
  const location = useLocation();
  const screen = useScreenType();
  const { setIsAuth } = useAuthContext();

  const onProfileContainerClick = useCallback(() => {
    nav(RouterPaths.profileSettings);
  }, []);

  const isDesktop = screen === 'desktop';
  const currentPage = location.pathname.split('/');

  return (
    <div className={cn(s.container, !isDesktop && s.container_mobile)}>
      <div className={s.wrapper}>
        {isDesktop && (
          <div onClick={() => setIsAuth(false)}>
            <Logo theme="alt" />
            <Spacing size={90} />
          </div>
        )}
        <div className={s.buttonsList}>
          {sections.map((btn) => (
            <div>
              <Spacing size={10} horizontal={!isDesktop} />
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
        <div className={s.profile} onClick={onProfileContainerClick}>
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
