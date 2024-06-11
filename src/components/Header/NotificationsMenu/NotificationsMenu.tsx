import * as React from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { observer } from 'mobx-react-lite';

import { Spacing } from 'components/Spacing';
import { Stub } from 'components/Stub';
import { useNotificationsStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';

import NotificationsIcon from 'img/icons/notifications.svg?react';

import { NotificationItem } from '../NotificationItem';

import s from './NotificationsMenu.module.scss';

type PointerDownOutsideEvent = CustomEvent<{ originalEvent: PointerEvent }>;

type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>;

const NotificationsMenu: React.FC = () => {
  const { notifications, markAsRead } = useNotificationsStore();

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const onOpenChange = () => {
    setIsOpen((open) => !open);
  };

  const closeDropdown = (e: PointerDownOutsideEvent | FocusOutsideEvent) => {
    e.preventDefault();

    if (e.currentTarget === triggerRef.current) {
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger className={s.wrapper} ref={triggerRef}>
        <NotificationsIcon className={s.icon} />
        {notifications.some(({ isRead }) => !isRead) && <div className={s.indicator} />}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={s.content}
          side="right"
          align="start"
          sideOffset={-34}
          alignOffset={34}
          onInteractOutside={closeDropdown}
        >
          {!notifications.length && <Stub size={SizeEnum.s} />}
          {!!notifications.length &&
            notifications.map((props, i) => (
              <React.Fragment key={props.id}>
                <NotificationItem {...props} markAsRead={() => markAsRead(props.id)} />
                {i < notifications.length - 1 && <Spacing size={1} />}
              </React.Fragment>
            ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default observer(NotificationsMenu);
