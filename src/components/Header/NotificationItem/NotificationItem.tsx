import * as React from 'react';

import cn from 'classnames';

import { Avatar, Spacing, Text } from 'components';
import { SizeEnum } from 'typings/ui';

import CheckIcon from 'img/icons/check-circle.svg?react';
import ImageStub from 'img/icons/user.svg?react';

import s from './NotificationItem.module.scss';

type Props = {
  avatar?: string;
  message: string;
  isRead: boolean;
  markAsRead: VoidFunction;
};

const NotificationItem: React.FC<Props> = ({ avatar, message, isRead, markAsRead }) => {
  return (
    <div className={s.wrapper}>
      {!isRead && <div className={s.indicator} />}
      <div className={s.content}>
        <Avatar
          image={avatar}
          stub={<ImageStub className={cn(s.icon, s.stub)} />}
          size={SizeEnum.s}
        />
        <Spacing size={1} horizontal />
        <Text>{message}</Text>
      </div>
      {!isRead && (
        <>
          <Spacing size={1} horizontal />
          <button className={s.button} title="Пометить как прочитанное" onClick={markAsRead}>
            <CheckIcon className={s.icon} />
          </button>
        </>
      )}
    </div>
  );
};

export default NotificationItem;
