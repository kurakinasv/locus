import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, GoBackButton, Input, Spacing, Text, Title } from 'components';
import { routes } from 'config/routes';
import { useUserStore } from 'store/RootStore/hooks';

import s from './EnterGroup.module.scss';

const EnterGroup: React.FC = () => {
  const nav = useNavigate();

  const { joinGroup, meta } = useUserStore();

  const [value, setValue] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onJoinGroup = async () => {
    await joinGroup(value);

    if (location.pathname === routes.joinAnotherGroup.full) {
      nav(routes.group.full);
    }
  };

  return (
    <div className={s.wrapper}>
      <Title size="h1">Войти в группу</Title>
      <Spacing size={4} />
      <Input
        placeholder="Код приглашения"
        value={value}
        onChange={onChange}
        disabled={meta.joinGroup.loading}
      />
      <Spacing size={1} />
      <Text className={s.text}>
        Введите код, который вы&nbsp;могли получить от&nbsp;пользователя locus, являющегося
        администратором одной из&nbsp;существующих групп
      </Text>
      <Spacing size={5.2} />
      <div className={s.buttons}>
        <GoBackButton disabled={meta.joinGroup.loading} />
        <Spacing size={1} horizontal />
        <Button onClick={onJoinGroup} disabled={!value || meta.joinGroup.loading}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default EnterGroup;
