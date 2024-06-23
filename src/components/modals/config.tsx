import React from 'react';

import { AddChore } from './views/AddChore';
import { AddSchedule } from './views/AddSchedule';
import { ChoreArchive } from './views/ChoreArchive';
import { ChoreEdit } from './views/ChoreEdit';
import { ExpensesAdd } from './views/ExpensesAdd';
import { ExpensesCloseDebt } from './views/ExpensesCloseDebt';
import { ExpensesDelete } from './views/ExpensesDelete';
import { ExpensesEdit } from './views/ExpensesEdit';
import { GroupAdminAlert } from './views/GroupAdminAlert';
import { GroupDebtsAlert } from './views/GroupDebtsAlert';
import { GroupDelete } from './views/GroupDelete';
import { GroupExit } from './views/GroupExit';
import { ProfileDelete } from './views/ProfileDelete';
import { ProfileExit } from './views/ProfileExit';
import { ScheduleDelete } from './views/ScheduleDelete';
import { ScheduleEdit } from './views/ScheduleEdit';
import { ShoppingListAdd } from './views/ShoppingListAdd';
import { ShoppingListDelete } from './views/ShoppingListDelete';
import { ShoppingListEdit } from './views/ShoppingListEdit';

type ModalConfigType = {
  title?: string;
  component: React.ReactNode;
  confirm?: boolean;
};

export enum ModalEnum {
  addChore = 'add-chore',
  editChore = 'edit-chore',
  addSchedule = 'add-schedule',
  editSchedule = 'edit-schedule',

  expensesAdd = 'expenses-add',
  expensesCloseDebt = 'expenses-close-debt',
  expensesDelete = 'expenses-delete',
  expensesEdit = 'expenses-edit',

  shoppingListAdd = 'shopping-list-add',
  shoppingListEdit = 'shopping-list-edit',
  shoppingListDelete = 'shopping-list-delete',

  profileExit = 'profile-exit',
  profileDelete = 'profile-delete',
  groupExit = 'group-exit',
  groupDelete = 'group-delete',
  groupDebtsAlert = 'group-debts-alert',
  groupAdminAlert = 'group-admin-alert',

  archiveChore = 'archive-chore',
  deleteSchedule = 'delete-schedule',
}

export const ModalConfig: Record<ModalEnum, ModalConfigType> = {
  // modals
  [ModalEnum.addChore]: {
    title: 'Новая задача',
    component: <AddChore />,
  },
  [ModalEnum.editChore]: {
    title: 'Изменить задачу',
    component: <ChoreEdit />,
  },
  [ModalEnum.addSchedule]: {
    title: 'Создать расписание',
    component: <AddSchedule />,
  },
  [ModalEnum.editSchedule]: {
    title: 'Изменить расписание',
    component: <ScheduleEdit />,
  },

  // expenses
  [ModalEnum.expensesAdd]: {
    title: 'Добавить трату',
    component: <ExpensesAdd />,
  },
  [ModalEnum.expensesCloseDebt]: {
    title: 'Закрыть долг',
    component: <ExpensesCloseDebt />,
  },
  [ModalEnum.expensesEdit]: {
    title: 'Редактировать трату',
    component: <ExpensesEdit />,
  },

  // shopping list
  [ModalEnum.shoppingListAdd]: {
    title: 'Новый список',
    component: <ShoppingListAdd />,
  },
  [ModalEnum.shoppingListEdit]: {
    title: 'Изменить список',
    component: <ShoppingListEdit />,
  },

  // confirms
  [ModalEnum.profileExit]: {
    title: 'Выйти из аккаунта',
    component: <ProfileExit />,
    confirm: true,
  },
  [ModalEnum.profileDelete]: {
    title: 'Удалить аккаунт',
    component: <ProfileDelete />,
    confirm: true,
  },
  [ModalEnum.groupExit]: {
    title: 'Выйти из группы',
    component: <GroupExit />,
    confirm: true,
  },
  [ModalEnum.groupDelete]: {
    title: 'Удалить группу',
    component: <GroupDelete />,
    confirm: true,
  },
  [ModalEnum.groupDebtsAlert]: {
    component: <GroupDebtsAlert />,
    confirm: true,
  },
  [ModalEnum.groupAdminAlert]: {
    component: <GroupAdminAlert />,
    confirm: true,
  },
  [ModalEnum.archiveChore]: {
    title: 'Архивировать задачу',
    component: <ChoreArchive />,
    confirm: true,
  },
  [ModalEnum.deleteSchedule]: {
    title: 'Удалить расписание',
    component: <ScheduleDelete />,
    confirm: true,
  },
  [ModalEnum.expensesDelete]: {
    title: 'Удалить трату',
    component: <ExpensesDelete />,
    confirm: true,
  },
  [ModalEnum.shoppingListDelete]: {
    title: 'Удалить список',
    component: <ShoppingListDelete />,
    confirm: true,
  },
};
