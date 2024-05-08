import * as React from 'react';

import { Button, Spacing } from 'components';
import { ModalEnum } from 'components/modals';
import { useScreenType } from 'store';
import { useUIStore } from 'store/RootStore/hooks';

import DoorIcon from 'img/icons/door.svg?react';
import TrashIcon from 'img/icons/trash.svg?react';

import s from './ButtonGroup.module.scss';

const ButtonGroup: React.FC = () => {
  const screen = useScreenType();
  const { openModal } = useUIStore();

  const openExitModal = () => {
    openModal(ModalEnum.profileExit);
  };

  const openDeleteModal = () => {
    openModal(ModalEnum.profileDelete);
  };

  return (
    <div className={s.buttonGroup}>
      <Button onClick={openExitModal} icon={<DoorIcon />} stretched opensModal>
        Выйти
      </Button>
      <Spacing size={1.5} horizontal={screen === 'desktop'} />
      <Button onClick={openDeleteModal} icon={<TrashIcon />} stretched opensModal>
        Удалить аккаунт
      </Button>
    </div>
  );
};

export default ButtonGroup;
