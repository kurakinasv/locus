import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, ButtonTheme, Input, Spacing, Text, Title } from 'components';
import { useGroupStore } from 'store/RootStore/hooks';

import ArrowSVG from 'img/icons/arrow-left.svg?react';

import s from './EnterGroup.module.scss';

const EnterGroup: React.FC = () => {
  const { enterGroup } = useGroupStore();

  const nav = useNavigate();

  const goBack = () => {
    nav(-1);
  };

  const [value, setValue] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div className={s.wrapper}>
      <Title size="h1">Войти в группу</Title>
      <Spacing size={4} />
      <Input placeholder="Код приглашения" value={value} onChange={onChange} />
      <Spacing size={1} />
      <Text className={s.text}>
        Введите код, который вы&nbsp;могли получить от&nbsp;пользователя locus, являющегося
        администратором одной из&nbsp;существующих групп
      </Text>
      <Spacing size={5.2} />
      <div className={s.buttons}>
        <Button theme={ButtonTheme.outlined} onClick={goBack} icon={<ArrowSVG />}>
          Назад
        </Button>
        <Spacing size={1} horizontal />
        <Button onClick={enterGroup} disabled={!value}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default EnterGroup;
