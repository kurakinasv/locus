import { makeAutoObservable } from 'mobx';

import RootStore from 'store/RootStore/RootStore';

class GroupStore {
  private readonly _rootStore: RootStore;

  inGroup = false;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  setInGroup = (inGroup: boolean) => {
    this.inGroup = inGroup;
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

export default GroupStore;
