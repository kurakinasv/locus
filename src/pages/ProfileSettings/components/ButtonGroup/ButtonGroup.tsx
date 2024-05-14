import * as React from 'react';

import { Button } from 'components';
import { ModalEnum } from 'components/modals';
import { useUIStore } from 'store/RootStore/hooks';

import DoorIcon from 'img/icons/door.svg?react';

import s from './ButtonGroup.module.scss';

const ButtonGroup: React.FC = () => {
  const { openModal } = useUIStore();

  const openExitModal = () => {
    openModal(ModalEnum.profileExit);
  };

  // todo: test and add account deletion
  return (
    <div className={s.buttonGroup}>
      <Button onClick={openExitModal} icon={<DoorIcon />} stretched opensModal>
        Выйти
      </Button>
      {/* <Spacing size={1.5} horizontal={screen === 'desktop'} />
      <Button onClick={openDeleteModal} icon={<TrashIcon />} stretched opensModal>
        Удалить аккаунт
      </Button> */}
    </div>
  );
};

export default ButtonGroup;
