import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { useAuthStore } from 'store/RootStore/hooks';
import { noop } from 'utils/noop';

const ProfileExit: React.FC = () => {
  const { logout } = useAuthStore();

  const exitAction = async () => {
    await logout();
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
