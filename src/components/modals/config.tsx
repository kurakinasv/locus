import React from 'react';

import { AddChore } from './views/AddChore';
import { AddSchedule } from './views/AddSchedule';
import { ChoreEdit } from './views/ChoreEdit';
import { GroupDebtsAlert } from './views/GroupDebtsAlert';
import { GroupDelete } from './views/GroupDelete';
import { GroupExit } from './views/GroupExit';
import { ProfileDelete } from './views/ProfileDelete';
import { ProfileExit } from './views/ProfileExit';
import { ScheduleEdit } from './views/ScheduleEdit';

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

  profileExit = 'profile-exit',
  profileDelete = 'profile-delete',
  groupExit = 'group-exit',
  groupDelete = 'group-delete',
  groupDebtsAlert = 'group-debts-alert',
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
};
