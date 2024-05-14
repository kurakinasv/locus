import { User } from './client';

export type UsersSelectListType = Array<User & { selected: boolean }>;

export const initializeUsers = (users: User[]): UsersSelectListType => {
  return users.reduce(
    (prev, user) => [...prev, { ...user, selected: false }],
    [] as UsersSelectListType
  );
};

export const chooseSingleUser = (usersList: UsersSelectListType, chosenId: User['id']) => {
  return usersList.reduce(
    (prev, user) => [...prev, { ...user, selected: user.selected ? false : user.id === chosenId }],
    [] as UsersSelectListType
  );
};

export const chooseMultipleUsers = (usersList: UsersSelectListType, chosenId: User['id']) => {
  return usersList.map((user) =>
    chosenId === user.id ? { ...user, selected: !user.selected } : user
  );
};
