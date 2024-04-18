import { makeAutoObservable, observable } from 'mobx';

import { MOCK_USERS } from 'entities/mock/user';
import { UserModel } from 'store/models/UserModel';

// todo: logic
class UserStore {
  isAuth = true;
  inGroup = true;

  user: UserModel | null = null;

  constructor() {
    makeAutoObservable(this, {
      user: observable.ref,
    });
  }

  login = () => {
    this.isAuth = true;
    this.user = new UserModel(MOCK_USERS[0]);
  };

  logout = () => {
    this.isAuth = false;
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
}

export default UserStore;
