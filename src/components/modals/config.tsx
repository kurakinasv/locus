import React from 'react';

import { AddChore } from './views/AddChore';
import { AddSchedule } from './views/AddSchedule';

export enum ModalEnum {
  addChore = 'add-chore',
  addSchedule = 'add-schedule',
}

export const ModalConfig = {
  [ModalEnum.addChore]: {
    title: 'Новая задача',
    component: <AddChore />,
  },
  [ModalEnum.addSchedule]: {
    title: 'Создать расписание',
    component: <AddSchedule />,
  },
};
