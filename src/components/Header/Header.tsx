import { FC, memo, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { Logo, Spacing, Title } from 'components';
import { routes } from 'config/routes';

import NotificationsIcon from 'img/icons/notifications.svg?react';
import UserIcon from 'img/icons/user.svg?react';

import s from './Header.module.scss';

type Props = {
  title?: string;
  hasGroup?: boolean;
};

const Header: FC<Props> = ({ title, hasGroup = false }) => {
  const nav = useNavigate();

  const onProfileClick = useCallback(() => {
    nav(routes.profileSettings.full);
  }, []);

  return (
    <div className={s.wrapper}>
      {title ? <Title size="h1">{title}</Title> : <Logo />}
      <div className={s.icons}>
        {hasGroup && (
          <>
            <NotificationsIcon className={s.icon} />
            <Spacing size={1.5} horizontal />
          </>
        )}
        <UserIcon className={s.icon} onClick={onProfileClick} />
      </div>
    </div>
  );
};

export default memo(Header);
