import { FC, ReactNode, useMemo } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { observer } from 'mobx-react-lite';

import { Button, Spacing, Tabs } from 'components';
import { ModalEnum } from 'components/modals';
import { Snackbar } from 'components/Snackbar';
import { tabs } from 'config/chores';
import { SnackbarTheme } from 'config/snackbar';
import { useSnackbar } from 'hooks/useSnackbar';
import { useScreenType } from 'store';
import { useUIStore } from 'store/RootStore/hooks';

import CalendarIcon from 'img/icons/calendar.svg?react';
import PlusIcon from 'img/icons/plus.svg?react';

import { ChoresTab, ScheduleTab } from './components';

import s from './Chores.module.scss';

const Chores: FC = () => {
  const { openModal: open } = useUIStore();
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

  const openModal = (modal: ModalEnum) => () => {
    open(modal);
  };

  return (
    <>
      <div className={s.buttons}>
        <Dialog.Trigger asChild>
          <Button icon={<CalendarIcon />} stretched onClick={openModal(ModalEnum.addSchedule)}>
            Запланировать задачу
          </Button>
        </Dialog.Trigger>
        <Dialog.Trigger asChild>
          <Button onClick={openModal(ModalEnum.addChore)}>schedule</Button>
        </Dialog.Trigger>
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

export default observer(Chores);
