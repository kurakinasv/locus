import * as React from 'react';

import { Button, Spacing, Text, Title, UsersSlider } from 'components';
import { User } from 'entities/user';
import { SizeEnum } from 'typings/ui';

type Props = {
  userId: User['id'];
  usersInGroup: User[];
  editGroup: (userIds: Array<User['id']>) => void;
};

const RightsSettings: React.FC<Props> = ({ usersInGroup, userId, editGroup }) => {
  const [touched, setTouched] = React.useState(false);

  const [users, setUsers] = React.useState<Array<User & { selected: boolean }>>(() =>
    usersInGroup.reduce(
      // todo: set other admins
      (prev, user) => [...prev, { ...user, selected: user.id === userId }],
      [] as Array<User & { selected: boolean }>
    )
  );

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

  const onSaveClick = React.useCallback(() => {
    const selectedUsers = users.filter((user) => user.selected);

    editGroup(selectedUsers.map((user) => user.id));
  }, [users, editGroup]);

  return (
    <>
      <Title size="h2">Права</Title>
      <Spacing size={2} />
      <Text color="gray">
        Настройте права для участников группы. Выберите участников, которые получат или потеряют
        права администратора группы.
      </Text>
      <Spacing size={1.5} />
      <UsersSlider users={users} onUserClick={onUserClick} />
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={onSaveClick} disabled={!touched}>
        Сохранить
      </Button>
    </>
  );
};

export default React.memo(RightsSettings);
