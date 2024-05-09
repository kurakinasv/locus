import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { SnackbarType } from 'config/snackbar';
import { User } from 'entities/user';
import { UserServer } from 'entities/user/server';
import { UserModel } from 'store/models/UserModel';
import RootStore from 'store/RootStore';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

// todo: logic
class UserStore {
  private readonly _rootStore: RootStore;

  user: UserModel | null = null;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  setUser(user: User | null) {
    this.user = user ? new UserModel(user) : null;
  }

  getUserDebt() {
    // todo: add logic
    return Math.floor(Math.random() * 10) > 4;
  }

  getUser = async () => {
    try {
      const response = await axios.get<UserServer>(ENDPOINTS.getUser.url, {
        withCredentials: true,
      });

      if (responseIsOk(response)) {
        this.setUser(response.data);
        return;
      }

      this._rootStore.uiStore.snackbar.open(SnackbarType.error);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  deleteAccount = async () => {
    try {
      const response = await axios.post(ENDPOINTS.deleteAccount.url, {}, { withCredentials: true });

      if (responseIsOk(response)) {
        this._rootStore.authStore.setAuth(false);
        this._rootStore.groupStore.setInGroup(false);
        this.setUser(null);

        return;
      }

      this._rootStore.uiStore.snackbar.open(SnackbarType.error);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default UserStore;
