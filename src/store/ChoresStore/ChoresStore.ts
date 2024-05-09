import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { ENDPOINTS } from 'config/api';
import RootStore from 'store/RootStore';
import { getErrorMsg } from 'utils/getErrorMsg';

class ChoresStore {
  private readonly _rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  createChore = async () => {
    try {
      const response = await axios.post(ENDPOINTS.createChore.url, {}, { withCredentials: true });

      if (response) {
        console.log('createChore', response);
      }
    } catch (error) {
      this._rootStore.uiStore.snackbar.openError(getErrorMsg(error));
    }
  };
}

export default ChoresStore;
