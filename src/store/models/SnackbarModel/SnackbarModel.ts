import { makeAutoObservable } from 'mobx';

import { SNACKBAR_CONFIG, SnackbarTheme, SnackbarType } from 'config/snackbar';

class SnackbarModel {
  isOpen = false;

  message: string = '';
  theme = SnackbarTheme.info;

  constructor() {
    makeAutoObservable<SnackbarModel>(this);
  }

  setIsOpen = (value: boolean) => {
    this.isOpen = value;
  };

  open = (snackbar: SnackbarType) => {
    this.message = SNACKBAR_CONFIG[snackbar].message;
    this.theme = SNACKBAR_CONFIG[snackbar].theme;

    this.setIsOpen(true);
  };

  openError = (message: string) => {
    this.message = message;
    this.theme = SnackbarTheme.error;

    this.setIsOpen(true);
  };

  close = () => {
    this.setIsOpen(false);
    this.message = '';
    this.theme = SnackbarTheme.info;
  };
}

export default SnackbarModel;
