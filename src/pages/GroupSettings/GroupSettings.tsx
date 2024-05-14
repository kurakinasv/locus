import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { Spacing } from 'components';
import { useGroupMemberStore, useGroupStore, useUserStore } from 'store/RootStore/hooks';

import { AddMember, CommonSettings } from './components';

import s from './GroupSettings.module.scss';

const GroupSettings: FC = () => {
  const { currentGroupMember } = useGroupMemberStore();
  const { group } = useGroupStore();
  const { user } = useUserStore();

  if (!group || !currentGroupMember || !user) {
    return null;
  }

  // const deleteUserFromGroup = (userId: UUIDString) => {
  //   editGroup({ userToDeleteId: userId });
  // };

  // const changeRights = (userIds: UUIDString[]) => {
  //   editGroup({ changeRights: userIds });
  // };

  // todo: delete group, exit from group, delete member, change rights
  return (
    <div className={s.wrapper}>
      <CommonSettings />
      {currentGroupMember.isAdmin && (
        <>
          <Spacing size={3.5} />
          <AddMember />
          {/* {group.users.length > 1 && (
            <>
              <Spacing size={3.5} />
              <RemoveMember userId={user.id} users={group.users} editGroup={deleteUserFromGroup} />
              <Spacing size={3.5} />
              <RightsSettings
                userId={user.id}
                usersInGroup={group.users}
                editGroup={changeRights}
              />
            </>
          )} */}
        </>
      )}
      {/* <Spacing size={3.5} /> */}
      {/* <Footer /> */}
      <Spacing size={6} />
    </div>
  );
};

export default observer(GroupSettings);
