import { makeAutoObservable } from 'mobx';

import UIStore from 'store/UIStore';
import UserStore from 'store/UserStore';

class RootStore {
  readonly userStore: UserStore;
  readonly uiStore: UIStore;

  readonly isDev: boolean;

  constructor() {
    makeAutoObservable(this);

    this.isDev = import.meta.env.DEV;

    this.userStore = new UserStore();
    this.uiStore = new UIStore();
  }
}

export default RootStore;
