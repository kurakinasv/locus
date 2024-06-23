import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { Button } from 'components/Button';
import { ModalEnum } from 'components/modals';
import { Spacing } from 'components/Spacing';
import { useScreenType } from 'store';
import {
  useGroupMemberStore,
  useGroupStore,
  useUIStore,
  useUserStore,
} from 'store/RootStore/hooks';

import DoorIcon from 'img/icons/door.svg?react';
import TrashIcon from 'img/icons/trash.svg?react';

import s from './Footer.module.scss';

const Footer: React.FC = () => {
  const screen = useScreenType();
  const { userDebt, user } = useUserStore();
  const { openModal } = useUIStore();
  const { groupMemberByUserId, groupMembers } = useGroupMemberStore();

  const { meta } = useGroupStore();

  const openGroupModal = (modal: ModalEnum) => () => {
    if (userDebt) {
      openModal(ModalEnum.groupDebtsAlert);
      return;
    }

    const admins = groupMembers.filter((groupMember) => groupMember.isAdmin);

    if (
      modal === ModalEnum.groupExit &&
      user &&
      groupMemberByUserId[user.id].isAdmin &&
      admins.length === 1
    ) {
      openModal(ModalEnum.groupAdminAlert);
      return;
    }

    openModal(modal);
  };

  if (!user) {
    return null;
  }

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
      {groupMemberByUserId[user.id].isAdmin && (
        <Button
          icon={<TrashIcon />}
          onClick={openGroupModal(ModalEnum.groupDelete)}
          stretched
          opensModal
          disabled={meta.deleteGroup.loading}
        >
          Удалить группу
        </Button>
      )}
    </div>
  );
};

export default observer(Footer);
