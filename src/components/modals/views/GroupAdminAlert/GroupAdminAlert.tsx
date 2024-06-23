import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';

const GroupAdminAlert: React.FC = () => {
  return (
    <DefaultConfirm confirmButton="Понятно">
      Вы единственный администратор в&nbsp;группе. Перед выходом необходимо назначить нового
      администратора.
    </DefaultConfirm>
  );
};

export default GroupAdminAlert;
