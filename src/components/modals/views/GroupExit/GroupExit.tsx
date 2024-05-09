import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { useGroupStore } from 'store/RootStore/hooks';
import { noop } from 'utils/noop';
import { sleep } from 'utils/sleep';

const GroupExit: React.FC = () => {
  const { exitGroup } = useGroupStore();

  const exitAction = async () => {
    await sleep(700);
    exitGroup();
  };

  return (
    <DefaultConfirm
      cancelAction={noop}
      cancelButton="Отмена"
      confirmAction={exitAction}
      confirmButton="Выйти"
    >
      <>
        Для возвращения в&nbsp;группу будет необходимо заново получить приглашение от&nbsp;её
        администратора
      </>
    </DefaultConfirm>
  );
};

export default GroupExit;
