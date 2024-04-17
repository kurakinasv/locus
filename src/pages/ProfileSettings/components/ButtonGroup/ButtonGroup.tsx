import * as React from 'react';

import { Button, Spacing } from 'components';
import { useScreenType } from 'store';
import { useUserStore } from 'store/RootStore/hooks';

import DoorIcon from 'img/icons/door.svg?react';
import TrashIcon from 'img/icons/trash.svg?react';

import s from './ButtonGroup.module.scss';

const ButtonGroup: React.FC = () => {
  const { logout } = useUserStore();
  const screen = useScreenType();

  return (
    <div className={s.buttonGroup}>
      <Button onClick={logout} icon={<DoorIcon />} stretched>
        Выйти
      </Button>
      <Spacing size={1.5} horizontal={screen === 'desktop'} />
      <Button onClick={logout} icon={<TrashIcon />} stretched>
        Удалить аккаунт
      </Button>
    </div>
  );
};

export default ButtonGroup;
