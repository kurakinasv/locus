import { makeAutoObservable } from 'mobx';

import AuthStore from 'store/AuthStore';
import UIStore from 'store/UIStore';
import UserStore from 'store/UserStore';

class RootStore {
  readonly uiStore: UIStore;

  readonly authStore: AuthStore;
  readonly userStore: UserStore;

  readonly isDev: boolean;

  constructor() {
    makeAutoObservable(this);

    this.isDev = import.meta.env.DEV;

    this.userStore = new UserStore();
    this.uiStore = new UIStore();

    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);
  }
}

export default RootStore;
