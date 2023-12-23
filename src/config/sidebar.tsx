import { FC } from 'react';

import ChoresIcon from 'img/sidebar/chores.svg?react';
import ExpensesIcon from 'img/sidebar/expenses.svg?react';
import ListIcon from 'img/sidebar/list.svg?react';
import SettingsIcon from 'img/sidebar/settings.svg?react';

import { RouterPaths } from './routes';

type SidebarButtonType = {
  id: number;
  icon: FC<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;
  title: string;
  path: string;
};

export const sections: SidebarButtonType[] = [
  {
    id: 1,
    icon: () => <ChoresIcon />,
    title: 'Домашние обязанности',
    path: RouterPaths.chores,
  },
  {
    id: 2,
    icon: () => <ExpensesIcon />,
    title: 'Трекер расходов',
    path: RouterPaths.expenses,
  },
  {
    id: 3,
    icon: () => <ListIcon />,
    title: 'Списки покупок',
    path: RouterPaths.shoppingLists,
  },
  {
    id: 4,
    icon: () => <SettingsIcon />,
    title: 'Настройки группы',
    path: RouterPaths.groupSettings,
  },
];
