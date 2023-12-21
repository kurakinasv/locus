import { FC } from 'react';

import Logo from 'img/icons/logo-icon-alt.svg?react';

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
    icon: () => <Logo />,
    title: 'Домашние обязанности',
    path: RouterPaths.chores,
  },
  {
    id: 2,
    icon: () => <Logo />,
    title: 'Трекер расходов',
    path: RouterPaths.expenses,
  },
  {
    id: 3,
    icon: () => <Logo />,
    title: 'Списки покупок',
    path: RouterPaths.shoppingLists,
  },
  {
    id: 4,
    icon: () => <Logo />,
    title: 'Настройки группы',
    path: RouterPaths.groupSettings,
  },
];
