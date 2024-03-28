import { FC, ReactNode, useMemo } from 'react';

import { Button, Spacing, Tabs } from 'components';
import { tabs } from 'config/chores';
import { useScreenType } from 'store';
import { noop } from 'utils';

import CalendarIcon from 'img/icons/calendar.svg?react';
import PlusIcon from 'img/icons/plus.svg?react';

import { ChoresTab, Schedule } from './components';

import s from './Chores.module.scss';

const Chores: FC = () => {
  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const tabsContent: Array<{ value: string; content: ReactNode }> = useMemo(
    () => [
      { content: <Schedule />, value: 'schedule' },
      { content: <ChoresTab />, value: 'chores' },
    ],
    []
  );

  return (
    <div>
      <Spacing size={5} />
      <div className={s.buttons}>
        <Button icon={<CalendarIcon />} stretched onClick={noop}>
          Запланировать задачу
        </Button>
        <Spacing size={isDesktop ? 1.6 : 0.8} horizontal={isDesktop} stretched />
        <Button icon={<PlusIcon />} stretched onClick={noop}>
          Создать задачу
        </Button>
      </div>
      <Spacing size={5} />
      <div className={s.tabsWrapper}>
        <Tabs tabOptions={tabs} tabsContent={tabsContent} />
      </div>
    </div>
  );
};

export default Chores;
