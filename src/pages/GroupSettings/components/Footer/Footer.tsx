import * as React from 'react';

import { Button } from 'components/Button';
import { ModalEnum } from 'components/modals';
import { Spacing } from 'components/Spacing';
import { useScreenType } from 'store';
import { useUIStore, useUserStore } from 'store/RootStore/hooks';

import DoorIcon from 'img/icons/door.svg?react';
import TrashIcon from 'img/icons/trash.svg?react';

import s from './Footer.module.scss';

const Footer: React.FC = () => {
  const screen = useScreenType();
  const { getUserDebt } = useUserStore();
  const { openModal } = useUIStore();

  const openGroupModal = (modal: ModalEnum) => () => {
    if (getUserDebt()) {
      openModal(ModalEnum.groupDebtsAlert);
      return;
    }

    openModal(modal);
  };

  return (
    <div className={s.footer}>
      <Button
        icon={<DoorIcon />}
        onClick={openGroupModal(ModalEnum.groupExit)}
        stretched
        opensModal
      >
        Выйти из группы
      </Button>
      <Spacing size={1.6} horizontal={screen === 'desktop'} />
      <Button
        icon={<TrashIcon />}
        onClick={openGroupModal(ModalEnum.groupDelete)}
        stretched
        opensModal
      >
        Удалить группу
      </Button>
    </div>
  );
};

export default Footer;
