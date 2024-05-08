import { makeAutoObservable, observable } from 'mobx';

import { MOCK_USERS } from 'entities/mock/user';
import { UserModel } from 'store/models/UserModel';

// todo: logic
class UserStore {
  isAuth = false;
  inGroup = false;

  user: UserModel | null = null;

  constructor() {
    makeAutoObservable(this, {
      user: observable.ref,
    });
  }

  getUserDebt() {
    // todo: add logic
    return Math.floor(Math.random() * 10) > 4;
  }

  login = () => {
    this.isAuth = true;
    this.user = new UserModel(MOCK_USERS[0]);
  };

  logout = () => {
    this.isAuth = false;
    this.inGroup = false;
  };

  deleteAccount = () => {
    this.isAuth = false;
    this.inGroup = false;
  };

  enterGroup = () => {
    this.inGroup = true;
  };

  createGroup = () => {
    this.inGroup = true;
  };

  exitGroup = () => {
    this.inGroup = false;
  };

  deleteGroup = () => {
    this.inGroup = false;
  };
}

export default UserStore;
