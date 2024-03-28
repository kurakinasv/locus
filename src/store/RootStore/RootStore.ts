import { makeAutoObservable } from 'mobx';

import UserStore from 'store/UserStore';

class RootStore {
  readonly userStore: UserStore;

  constructor() {
    makeAutoObservable(this);

    this.userStore = new UserStore();
  }
}

export default RootStore;
