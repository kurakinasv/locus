import React from 'react';

import { AddChore } from './views/AddChore';
import { AddSchedule } from './views/AddSchedule';
import { ProfileDelete } from './views/ProfileDelete';
import { ProfileExit } from './views/ProfileExit';

type ModalConfigType = {
  title: string;
  component: React.ReactNode;
  confirm?: boolean;
};

export enum ModalEnum {
  addChore = 'add-chore',
  addSchedule = 'add-schedule',

  profileExit = 'profile-exit',
  profileDelete = 'profile-delete',
}

export const ModalConfig: Record<ModalEnum, ModalConfigType> = {
  // modals
  [ModalEnum.addChore]: {
    title: 'Новая задача',
    component: <AddChore />,
  },
  [ModalEnum.addSchedule]: {
    title: 'Создать расписание',
    component: <AddSchedule />,
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
};
