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
  copyInviteCode = 'copyInviteCode',
  choreCreated = 'choreCreated',
  choreUpdated = 'choreUpdated',
  scheduleCreated = 'scheduleCreated',
  scheduleEdited = 'scheduleEdited',
  scheduleDeleted = 'scheduleDeleted',
  taskEdited = 'taskEdited',
  expenseCreated = 'expenseCreated',
  expenseEdited = 'expenseEdited',
  expenseDeleted = 'expenseDeleted',
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
  [SnackbarType.scheduleCreated]: {
    message: 'Расписание успешно создано',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.scheduleEdited]: {
    message: 'Расписание успешно изменено',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.scheduleDeleted]: {
    message: 'Расписание успешно удалено',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.taskEdited]: {
    message: 'Задача успешно изменена',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.expenseCreated]: {
    message: 'Трата успешно внесена',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.expenseEdited]: {
    message: 'Информация о трате успешно изменена',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.expenseDeleted]: {
    message: 'Трата успешно удалена',
    theme: SnackbarTheme.success,
  },
};
