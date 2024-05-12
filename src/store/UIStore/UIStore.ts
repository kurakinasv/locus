import { action, computed, makeObservable, observable } from 'mobx';

import { ModalEnum } from 'components/modals';
import SnackbarModel from 'store/models/SnackbarModel';

type PrivateFields = '_modal';

class UIStore<ModalStateT> {
  private _modal: ModalEnum | null = null;

  modalState: ModalStateT | null = null;

  readonly snackbar = new SnackbarModel();

  constructor() {
    makeObservable<UIStore<ModalStateT>, PrivateFields>(this, {
      _modal: observable,
      modalState: observable,
      snackbar: observable.ref,
      modal: computed,
      openModal: action,
      closeModal: action,
    });
  }

  get modal(): ModalEnum | null {
    return this._modal;
  }

  openModal = <StateT extends ModalStateT>(modal: ModalEnum, state?: StateT) => {
    this._modal = modal;

    if (state) {
      this.modalState = state;
    }
  };

  closeModal = () => {
    this._modal = null;
    this.modalState = null;
  };

  onOpenChange = (isOpen: boolean) => {
    !isOpen && this.closeModal();
  };
}

export default UIStore;
