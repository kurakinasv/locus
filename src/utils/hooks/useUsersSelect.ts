import { User } from 'entities/user';
import {
  UsersSelectListType,
  chooseMultipleUsers,
  chooseSingleUser,
  initializeUsers,
} from 'entities/user/service';
import { useGroupStore } from 'store/RootStore/hooks';

export const useUsersSelect = (single = false) => {
  const { group } = useGroupStore();

  const [users, setUsers] = React.useState<UsersSelectListType>(() =>
    group?.users ? initializeUsers(group.users) : []
  );

  const onUserClick = React.useCallback(
    (id: User['id']) => () => {
      setUsers((prev) => (single ? chooseSingleUser(prev, id) : chooseMultipleUsers(prev, id)));
    },
    [single]
  );

  return { users, onUserClick };
};
