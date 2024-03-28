import { makeAutoObservable } from 'mobx';

class UserStore {
  isAuth = false;
  inGroup = false;

  constructor() {
    makeAutoObservable(this);
  }

  login = () => {
    this.isAuth = true;
  };

  logout = () => {
    this.isAuth = false;
  };

  enterGroup = () => {
    this.inGroup = true;
  };

  exitGroup = () => {
    this.inGroup = false;
  };
}

export default UserStore;
