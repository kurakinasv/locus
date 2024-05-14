import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { useSchedulesStore, useUIStore } from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';
import { noop } from 'utils/noop';

const ScheduleDelete: React.FC = () => {
  const { modalState, closeModal } = useUIStore<{ scheduleId: DefaultId }>();

  const { deleteSchedule } = useSchedulesStore();

  const deleteAction = async () => {
    if (!modalState?.scheduleId) {
      return;
    }

    await deleteSchedule(modalState.scheduleId);
    closeModal();
  };

  return (
    <DefaultConfirm
      confirmAction={deleteAction}
      confirmButton="Удалить"
      cancelButton="Отмена"
      cancelAction={noop}
    >
      При удалении расписания будут удалены также все незавершенные запланированные задачи,
      созданные по&nbsp;этому расписанию, начиная с&nbsp;сегодняшнего дня
    </DefaultConfirm>
  );
};

export default observer(ScheduleDelete);
