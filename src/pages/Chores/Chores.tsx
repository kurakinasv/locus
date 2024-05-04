import { FC, ReactNode, useMemo } from 'react';

import { Button, Spacing, Tabs } from 'components';
import { Snackbar } from 'components/Snackbar';
import { tabs } from 'config/chores';
import { SnackbarTheme } from 'config/snackbar';
import { useSnackbar } from 'hooks/useSnackbar';
import { useScreenType } from 'store';
import { noop } from 'utils';

import CalendarIcon from 'img/icons/calendar.svg?react';
import PlusIcon from 'img/icons/plus.svg?react';

import { ChoresTab, ScheduleTab } from './components';

import s from './Chores.module.scss';

const Chores: FC = () => {
  const screen = useScreenType();
  const isDesktop = screen === 'desktop';

  const { isOpen, openSnackbar, closeSnackbar } = useSnackbar();

  const tabsContent: Array<{ value: string; content: ReactNode }> = useMemo(
    () => [
      { content: <ScheduleTab />, value: 'schedule' },
      { content: <ChoresTab />, value: 'chores' },
    ],
    []
  );

  return (
    <>
      <div className={s.buttons}>
        <Button icon={<CalendarIcon />} stretched onClick={noop}>
          Запланировать задачу
        </Button>
        <Spacing size={isDesktop ? 1.6 : 0.8} horizontal={isDesktop} stretched />
        <Button icon={<PlusIcon />} stretched onClick={openSnackbar}>
          Создать задачу
        </Button>
      </div>
      <Spacing size={2.4} />
      <div className={s.tabsWrapper}>
        <Tabs tabOptions={tabs} tabsContent={tabsContent} />
      </div>
      <Snackbar isVisible={isOpen} onDismiss={closeSnackbar} theme={SnackbarTheme.info}>
        Задача успешно создана
      </Snackbar>
    </>
  );
};

export default Chores;
