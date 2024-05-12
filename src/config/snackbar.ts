export enum SnackbarTheme {
  success = 'success',
  error = 'error',
  info = 'info',
}

export enum SnackbarType {
  error = 'error',
  passwordsDoNotMatch = 'passwordsDoNotMatch',
  chooseOneUser = 'chooseOneUser',
  groupEdited = 'groupEdited',
  choreCreated = 'choreCreated',
  choreUpdated = 'choreUpdated',
  copyInviteCode = 'copyInviteCode',
}

export const SNACKBAR_CONFIG: Record<SnackbarType, { message: string; theme: SnackbarTheme }> = {
  [SnackbarType.error]: {
    message: 'Произошла ошибка',
    theme: SnackbarTheme.error,
  },
  [SnackbarType.passwordsDoNotMatch]: {
    message: 'Пароли не совпадают',
    theme: SnackbarTheme.error,
  },
  [SnackbarType.chooseOneUser]: {
    message: 'Выберите хотя бы одного пользователя',
    theme: SnackbarTheme.error,
  },
  [SnackbarType.groupEdited]: {
    message: 'Настройки группы успешно изменены',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.choreCreated]: {
    message: 'Задача успешно создана',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.choreUpdated]: {
    message: 'Задача успешно изменена',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.copyInviteCode]: {
    message: 'Код приглашения скопирован в буфер обмена',
    theme: SnackbarTheme.info,
  },
};
