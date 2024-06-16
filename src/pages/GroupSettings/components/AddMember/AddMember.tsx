import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { Button, Input, Spacing, Text, Title } from 'components';
import { MAX_MEMBERS } from 'config/group';
import { SnackbarType } from 'config/snackbar';
import { useGroupStore, useUIStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';

import CopyIcon from 'img/icons/copy.svg?react';

import s from './AddMember.module.scss';

const AddMember: React.FC = () => {
  const { generateInviteCode, inviteCode, group } = useGroupStore();
  const { snackbar } = useUIStore();

  const copy = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      snackbar.open(SnackbarType.copyInviteCode);
    }
  };

  if (!group || !group.users) {
    return null;
  }

  // todo: invite link
  return (
    <>
      <Title size="h2">Добавить участника</Title>
      <Spacing size={2} />
      {/* <Text color="gray">Пригласите нового участника, отправив ему ссылку-приглашение</Text>
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={noop}>
        Скопировать
      </Button>
      <Spacing size={2.2} /> */}
      <Text color="gray" size={SizeEnum.l}>
        Пригласите нового участника, отправив ему код-приглашение
      </Text>
      <Spacing size={1.2} />
      {inviteCode && (
        <>
          <Input
            type="text"
            value={inviteCode}
            placeholder=""
            readOnly
            onClick={copy}
            className={s.copy}
            icon={CopyIcon}
          />
          <Spacing size={1.2} />
        </>
      )}
      <Button
        size={SizeEnum.s}
        onClick={generateInviteCode}
        disabled={group.users.length >= MAX_MEMBERS}
      >
        Сгенерировать код
      </Button>
      {group.users.length >= MAX_MEMBERS && (
        <>
          <Spacing size={0.8} />
          <Text className={s.text}>
            Достигнуто максимальное число участников&nbsp;&mdash; {MAX_MEMBERS}
          </Text>
        </>
      )}
    </>
  );
};

export default observer(AddMember);
