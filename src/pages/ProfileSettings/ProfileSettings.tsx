import React, { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import { Spacing, Title, GoBackButton } from 'components';
import { routes } from 'config/routes';
import { useUserStore } from 'store/RootStore/hooks';

import { SettingsForm, ButtonGroup, GroupSelection } from './components';

import s from './ProfileSettings.module.scss';

const ProfileSettings: FC = () => {
  const location = useLocation();

  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.from === routes.entry.full && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const { user, userGroups } = useUserStore();

  if (!user) {
    return;
  }

  return (
    <div className={s.wrapper}>
      <Spacing size={6} />
      <Title size="h1">Настройки</Title>
      <Spacing size={3} />
      <GoBackButton />
      <Spacing size={2} />
      <SettingsForm />
      {!!userGroups.length && (
        <>
          <Spacing size={2.5} />
          <div ref={ref} />
          <GroupSelection />
        </>
      )}
      <Spacing size={4.5} />
      <ButtonGroup />
    </div>
  );
};

export default observer(ProfileSettings);
