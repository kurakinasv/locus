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
  userRemovedFromGroup = 'userRemovedFromGroup',
  adminsEdited = 'adminsEdited',
  profileEdited = 'profileEdited',
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
  debtEdited = 'debtEdited',
  listCreated = 'listCreated',
  listEdited = 'listEdited',
  listDeleted = 'listDeleted',
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
  [SnackbarType.userRemovedFromGroup]: {
    message: 'Пользователь успешно удален из группы',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.adminsEdited]: {
    message: 'Администраторы успешно изменены',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.profileEdited]: {
    message: 'Настройки профиля успешно изменены',
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
  [SnackbarType.debtEdited]: {
    message: 'Информация о долге успешно изменена',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.listCreated]: {
    message: 'Список успешно создан',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.listEdited]: {
    message: 'Список успешно изменен',
    theme: SnackbarTheme.success,
  },
  [SnackbarType.listDeleted]: {
    message: 'Список успешно удален',
    theme: SnackbarTheme.success,
  },
};
