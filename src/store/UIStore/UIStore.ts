import { action, computed, makeObservable, observable } from 'mobx';

import { ModalEnum } from 'components/modals';

type PrivateFields = '_modal';

class UIStore {
  private _modal: ModalEnum | null = null;

  constructor() {
    makeObservable<UIStore, PrivateFields>(this, {
      _modal: observable,
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
