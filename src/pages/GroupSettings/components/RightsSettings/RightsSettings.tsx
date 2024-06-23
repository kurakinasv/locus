import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { Button, Spacing, Text, Title, UsersSlider } from 'components';
import { User } from 'entities/user';
import { useGroupMemberStore, useGroupStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';

type Props = {
  userId: User['id'];
  usersInGroup: User[];
};

const RightsSettings: React.FC<Props> = ({ usersInGroup, userId }) => {
  const { editAdmins, meta } = useGroupStore();
  const { groupMembers, groupMemberByUserId } = useGroupMemberStore();

  const [touched, setTouched] = React.useState(false);

  const [users, setUsers] = React.useState<Array<User & { selected: boolean }>>([]);

  React.useEffect(() => {
    setUsers(
      usersInGroup.reduce(
        (prev, user) => [
          ...prev,
          {
            ...user,
            selected: user.id === userId || !!groupMemberByUserId[user.id].isAdmin,
          },
        ],
        [] as Array<User & { selected: boolean }>
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersInGroup, userId, groupMembers]);

  const onUserClick = React.useCallback(
    (id: User['id']) => () => {
      if (userId === id) {
        return;
      }

      setUsers((prev) =>
        prev.map((user) => (id === user.id ? { ...user, selected: !user.selected } : user))
      );
      setTouched(true);
    },
    [userId]
  );

  const onSaveClick = React.useCallback(async () => {
    const selectedUsers = users.filter((user) => user.selected);

    await editAdmins(selectedUsers.map((user) => user.id));

    setTouched(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <>
      <Title size="h2">Права</Title>
      <Spacing size={2} />
      <Text color="gray">
        Настройте права для участников группы. Выберите участников, которые получат или потеряют
        права администратора группы.
      </Text>
      <Spacing size={1.5} />
      <UsersSlider
        users={users}
        onUserClick={onUserClick}
        pinCurrentUser
        disabled={meta.editGroup.loading}
      />
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={onSaveClick} disabled={!touched || meta.editGroup.loading}>
        Сохранить
      </Button>
    </>
  );
};

export default observer(RightsSettings);
