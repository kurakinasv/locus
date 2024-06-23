import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Spacing } from 'components';
import { useGroupMemberStore, useGroupStore, useUserStore } from 'store/RootStore/hooks';

import { AddMember, CommonSettings, Footer, RemoveMember, RightsSettings } from './components';

import s from './GroupSettings.module.scss';

const GroupSettings: FC = () => {
  const { currentGroupMember } = useGroupMemberStore();
  const { group } = useGroupStore();
  const { user } = useUserStore();

  if (!group || !currentGroupMember || !user) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      <CommonSettings />
      {currentGroupMember.isAdmin && (
        <>
          <Spacing size={3.5} />
          <AddMember />
          {group.users.length > 1 && (
            <>
              <Spacing size={3.5} />
              <RemoveMember userId={user.id} users={group.users} />
              <Spacing size={3.5} />
              <RightsSettings userId={user.id} usersInGroup={group.users} />
            </>
          )}
        </>
      )}
      <Spacing size={3.5} />
      <Footer />
      <Spacing size={6} />
    </div>
  );
};

export default observer(GroupSettings);
