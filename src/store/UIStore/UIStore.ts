import { action, computed, makeObservable, observable } from 'mobx';

import { ModalEnum } from 'components/modals';
import SnackbarModel from 'store/models/SnackbarModel';

type PrivateFields = '_modal';

class UIStore {
  private _modal: ModalEnum | null = null;

  readonly snackbar = new SnackbarModel();

  constructor() {
    makeObservable<UIStore, PrivateFields>(this, {
      _modal: observable,
      snackbar: observable.ref,
      modal: computed,
      openModal: action,
      closeModal: action,
    });
  }

  get modal(): ModalEnum | null {
    return this._modal;
  }

  openModal = (modal: ModalEnum) => {
    this._modal = modal;
  };

  closeModal = () => {
    this._modal = null;
  };
}

export default UIStore;
