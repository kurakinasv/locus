import { User } from 'entities/user';

export type RegisterParams = {
  username: User['username'];
  email: User['email'];
  password: string;
  repeatedPassword: string;
};

export type LoginParams = {
  email: User['email'];
  password: string;
};

export type EditProfileParams = {
  name?: User['name'];
  surname?: User['surname'];
  photo?: File | null;
};
