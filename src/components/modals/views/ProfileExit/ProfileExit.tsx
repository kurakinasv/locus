import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { useUIStore, useUserStore } from 'store/RootStore/hooks';
import { noop } from 'utils/noop';
import { sleep } from 'utils/sleep';

const ProfileExit: React.FC = () => {
  const { logout } = useUserStore();
  const { closeModal } = useUIStore();

  const exitAction = async () => {
    await sleep(700);
    logout();
    closeModal();
  };

  return (
    <DefaultConfirm
      cancelAction={noop}
      cancelButton="Отмена"
      confirmAction={exitAction}
      confirmButton="Выйти"
    >
      <>Ваши данные и&nbsp;группы будут доступны при следующем входе</>
    </DefaultConfirm>
  );
};

export default ProfileExit;
