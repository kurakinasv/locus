import { makeAutoObservable } from 'mobx';

import UserStore from 'store/UserStore';

class RootStore {
  readonly userStore: UserStore;

  readonly isDev: boolean;

  constructor() {
    makeAutoObservable(this);

    this.isDev = import.meta.env.DEV;

    this.userStore = new UserStore();
  }
}

export default RootStore;
