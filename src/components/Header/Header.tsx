import { FC, memo, useCallback, useEffect } from 'react';

import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { Logo, Spacing, Title } from 'components';
import { routes } from 'config/routes';
import { useAuthStore, useNotificationsStore } from 'store/RootStore/hooks';

import UserIcon from 'img/icons/user.svg?react';

import { NotificationsMenu } from './NotificationsMenu';

import s from './Header.module.scss';

type Props = {
  title?: string;
  hasGroup?: boolean;
};

const Header: FC<Props> = ({ title, hasGroup = false }) => {
  const nav = useNavigate();
  const location = useLocation();
  const { isAuth } = useAuthStore();
  const { loadNotifications } = useNotificationsStore();

  const onProfileClick = useCallback(() => {
    nav(routes.profileSettings.full);
  }, []);

  const isProfileSettings = location.pathname === routes.profileSettings.full;

  useEffect(() => {
    if (isAuth && hasGroup) {
      loadNotifications();
    }
  }, [isAuth, hasGroup]);

  return (
    <div className={cn(s.wrapper, (isProfileSettings || !isAuth) && s.wrapper_center)}>
      {title ? <Title size="h1">{title}</Title> : <Logo />}
      {!isProfileSettings && isAuth && (
        <div className={s.icons}>
          {hasGroup && (
            <>
              <NotificationsMenu />
              <Spacing size={1.5} horizontal />
            </>
          )}
          <UserIcon className={s.icon} onClick={onProfileClick} />
        </div>
      )}
    </div>
  );
};

export default memo(Header);
