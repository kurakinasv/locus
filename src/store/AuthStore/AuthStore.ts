import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { ENDPOINTS } from 'config/api';
import { USER_STORAGE } from 'config/localStorage';
import { SnackbarType } from 'config/snackbar';
import { User } from 'entities/user';
import { LoginParams, RegisterParams } from 'entities/user/params';
import { UserServer } from 'entities/user/server';
import MetaModel from 'store/models/MetaModel';
import RootStore from 'store/RootStore/RootStore';
import { getErrorMsg } from 'utils/getErrorMsg';
import { responseIsOk } from 'utils/responseIsOk';

class AuthStore {
  private readonly _rootStore: RootStore;

  readonly meta = new MetaModel();

  isAuth = false;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  setAuth = (isAuth: boolean) => {
    this.isAuth = isAuth;
  };

  initUser = async (user: User) => {
    localStorage.setItem(USER_STORAGE, JSON.stringify(user.id));
    this._rootStore.userStore.setUser(user);

    await this._rootStore.groupMemberStore.init();

    const currentMember = this._rootStore.groupMemberStore.currentGroupMember;

    if (currentMember) {
      await this._rootStore.groupStore.getGroup(currentMember.groupId);
    }

    this.setAuth(true);
  };

  init = async () => {
    try {
      this.meta.startLoading();

      const userId: string | null = JSON.parse(String(localStorage.getItem(USER_STORAGE)));

      if (!userId) {
        this.setAuth(false);
        this.meta.stopLoading();
        return;
      }

      await this._rootStore.userStore.getUser();
      await this._rootStore.groupMemberStore.init();

      const currentMember = this._rootStore.groupMemberStore.currentGroupMember;

      if (currentMember) {
        await this._rootStore.groupStore.getGroup(currentMember.groupId);
      }

      this.setAuth(true);

      this.meta.stopLoading();
    } catch (error) {
      this.meta.stopLoading();
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  login = async ({ email, password }: LoginParams) => {
    try {
      this.meta.startLoading();

      const response = await axios.post<UserServer>(
        ENDPOINTS.login.url,
        { password, email },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.initUser(response.data);
      }

      this.meta.stopLoading();
    } catch (error) {
      this.meta.stopLoading();
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  register = async ({ email, password, repeatedPassword, username }: RegisterParams) => {
    if (password !== repeatedPassword) {
      this._rootStore.uiStore.snackbar.open(SnackbarType.passwordsDoNotMatch);

      return;
    }

    try {
      this.meta.startLoading();

      const response = await axios.post<UserServer>(
        ENDPOINTS.register.url,
        { username, password, email },
        { withCredentials: true }
      );

      if (responseIsOk(response)) {
        this.initUser(response.data);
      }

      this.meta.stopLoading();
    } catch (error) {
      this.meta.stopLoading();
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };

  logout = async () => {
    try {
      this.meta.startLoading();

      const response = await axios.post(ENDPOINTS.logout.url, {}, { withCredentials: true });

      if (responseIsOk(response)) {
        this.setAuth(false);
        this._rootStore.userStore.setInGroup(false);
        this._rootStore.userStore.setUser(null);
        this._rootStore.groupMemberStore.setGroupMembers([]);
        localStorage.removeItem(USER_STORAGE);
      }

      this.meta.stopLoading();
    } catch (error) {
      this.meta.stopLoading();
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default AuthStore;
