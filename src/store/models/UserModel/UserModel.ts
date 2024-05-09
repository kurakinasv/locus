import { makeAutoObservable } from 'mobx';

import { User } from 'entities/user';
import { UUIDString } from 'typings/api';

// todo: add more fields
class UserModel {
  id: UUIDString;
  name?: string;
  surname?: string;
  username: string;
  email: string;
  // image?: string;
  // phone?: string;
  // birthday?: string;
  // createdAt: string;
  // adminInGroups: number[];

  constructor(user: User) {
    makeAutoObservable(this);

    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.username = user.username;
    this.email = user.email;
    // this.image = user.image;
    // this.phone = user.phone;
    // this.birthday = user.birthday;
    // this.createdAt = user.createdAt;
    // this.adminInGroups = user.adminInGroups || [];
  }
}

export default UserModel;
