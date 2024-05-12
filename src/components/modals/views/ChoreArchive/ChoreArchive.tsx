import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { useChoresStore, useUIStore } from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';
import { noop } from 'utils/noop';

const ChoreArchive: React.FC = () => {
  const { editChore } = useChoresStore();
  const { modalState, closeModal } = useUIStore<{ choreId: DefaultId }>();

  const deleteAction = async () => {
    if (!modalState?.choreId) {
      return;
    }

    await editChore({ choreId: modalState?.choreId, isArchived: true });
    closeModal();
  };

  return (
    <DefaultConfirm
      confirmAction={deleteAction}
      confirmButton="Ок"
      cancelButton="Отмена"
      cancelAction={noop}
    >
      Задача будет архивирована и&nbsp;больше не&nbsp;будет отображаться в&nbsp;списке доступных
      задач. Все созданные расписания не&nbsp;изменятся
    </DefaultConfirm>
  );
};

export default observer(ChoreArchive);
