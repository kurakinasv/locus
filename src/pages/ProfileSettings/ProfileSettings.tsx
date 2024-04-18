import React, { FC, useCallback } from 'react';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Spacing, Button, Title } from 'components';
import { useUserStore } from 'store/RootStore/hooks';

import { SettingsForm, ButtonGroup } from './components';

import s from './ProfileSettings.module.scss';

const ProfileSettings: FC = () => {
  const nav = useNavigate();

  const { user, login } = useUserStore();

  React.useEffect(() => {
    if (!user) {
      login();
    }
  }, []);

  const onGoBack = useCallback(() => {
    nav(-1);
  }, []);

  return (
    <div className={s.wrapper}>
      <Spacing size={6} />
      <Title size="h1">Настройки</Title>
      <Spacing size={3} />
      <SettingsForm />
      <Spacing size={1.5} />
      <Button onClick={onGoBack} stretched>
        Назад
      </Button>
      <Spacing size={4.5} />
      <ButtonGroup />
    </div>
  );
};

export default observer(ProfileSettings);
