import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { useAuthStore, useUIStore } from 'store/RootStore/hooks';
import { noop } from 'utils/noop';
import { sleep } from 'utils/sleep';

const ProfileDelete: React.FC = () => {
  const { logout } = useAuthStore();
  const { closeModal } = useUIStore();

  const deleteAction = async () => {
    await sleep(200);
    logout();
    closeModal();
  };

  return (
    <DefaultConfirm
      cancelAction={noop}
      cancelButton="Отмена"
      confirmAction={deleteAction}
      confirmButton="Удалить"
    >
      При удалении аккаунта ваши данные нельзя будет восстановить
    </DefaultConfirm>
  );
};

export default ProfileDelete;
