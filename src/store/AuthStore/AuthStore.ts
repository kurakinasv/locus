import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { SnackbarType } from 'config/snackbar';
import { User } from 'entities/user';
import { LoginParams, RegisterParams } from 'entities/user/params';
import { UserServer } from 'entities/user/server';
import RootStore from 'store/RootStore/RootStore';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

const userStorageName = 'user';

class AuthStore {
  private readonly _rootStore: RootStore;

  isAuth = false;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  setAuth = (isAuth: boolean) => {
    this.isAuth = isAuth;
  };

  initUser(user: User) {
    localStorage.setItem(userStorageName, JSON.stringify(user.id));
    this._rootStore.userStore.setUser(user);
    this.setAuth(true);
  }

  checkAuth = async () => {
    try {
      const userId: string | null = JSON.parse(String(localStorage.getItem(userStorageName)));

      if (!userId) {
        this.setAuth(false);
        return;
      }

      await this._rootStore.userStore.getUser();

      this.setAuth(true);
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  login = async ({ email, password }: LoginParams) => {
    try {
      const response = await axios.post<UserServer>(
        ENDPOINTS.login.url,
        { password, email },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.initUser(response.data);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  register = async ({ email, password, repeatedPassword, username }: RegisterParams) => {
    if (password !== repeatedPassword) {
      this._rootStore.uiStore.snackbar.open(SnackbarType.passwordsDoNotMatch);

      return;
    }

    try {
      const response = await axios.post<UserServer>(
        ENDPOINTS.register.url,
        { username, password, email },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.initUser(response.data);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  logout = async () => {
    try {
      const response = await axios.post(ENDPOINTS.logout.url, {}, { withCredentials: true });

      if (responseIsOk(response)) {
        this.setAuth(false);
        this._rootStore.groupStore.setInGroup(false);
        this._rootStore.userStore.setUser(null);
        localStorage.removeItem(userStorageName);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default AuthStore;
