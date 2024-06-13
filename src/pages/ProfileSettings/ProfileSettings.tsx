import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Spacing, Title, GoBackButton } from 'components';
import { useUserStore } from 'store/RootStore/hooks';

import { SettingsForm, ButtonGroup } from './components';

import s from './ProfileSettings.module.scss';

const ProfileSettings: FC = () => {
  const { user } = useUserStore();

  if (!user) {
    return;
  }

  return (
    <div className={s.wrapper}>
      <Spacing size={6} />
      <Title size="h1">Настройки</Title>
      <Spacing size={3} />
      <SettingsForm />
      <Spacing size={4.5} />
      <GoBackButton />
      <Spacing size={1.5} />
      <ButtonGroup />
    </div>
  );
};

export default observer(ProfileSettings);
