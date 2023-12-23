import { FC, memo } from 'react';

import { Logo, Spacing, Title } from 'components';

import NotificationsIcon from 'img/icons/notifications.svg?react';
import UserIcon from 'img/icons/user.svg?react';

import s from './Header.module.scss';

type Props = {
  title?: string;
  hasGroup?: boolean;
};

const Header: FC<Props> = ({ title, hasGroup = false }) => {
  return (
    <div className={s.wrapper}>
      {title ? <Title size="h1">{title}</Title> : <Logo />}
      <div className={s.icons}>
        {hasGroup && (
          <>
            <NotificationsIcon className={s.icon} />
            <Spacing size={15} horizontal />
          </>
        )}
        <UserIcon className={s.icon} />
      </div>
    </div>
  );
};

export default memo(Header);
