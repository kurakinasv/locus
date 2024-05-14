import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { useUserStore } from 'store/RootStore/hooks';
import { noop } from 'utils/noop';
import { sleep } from 'utils/sleep';

const GroupDelete: React.FC = () => {
  const { deleteGroup } = useUserStore();

  const deleteAction = async () => {
    await sleep(700);
    deleteGroup();
  };

  return (
    <DefaultConfirm
      cancelAction={noop}
      cancelButton="Отмена"
      confirmAction={deleteAction}
      confirmButton="Удалить"
    >
      Будут удалены все данные участников, связанные с&nbsp;этой группой. Эти данные нельзя будет
      восстановить
    </DefaultConfirm>
  );
};

export default GroupDelete;
