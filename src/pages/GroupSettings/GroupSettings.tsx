import { FC } from 'react';

import { Spacing } from 'components';

import { AddMember, CommonSettings, Footer, RemoveMember, RightsSettings } from './components';

import s from './GroupSettings.module.scss';

const GroupSettings: FC = () => {
  return (
    <div className={s.wrapper}>
      <CommonSettings />
      <Spacing size={3.5} />
      <AddMember />
      <Spacing size={3.5} />
      <RemoveMember />
      <Spacing size={3.5} />
      <RightsSettings />
      <Spacing size={3.5} />
      <Footer />
      <Spacing size={6} />
    </div>
  );
};

export default GroupSettings;
