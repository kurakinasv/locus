import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';

const GroupDebtsAlert: React.FC = () => {
  return (
    <DefaultConfirm confirmButton="Понятно">
      Перед выходом из&nbsp;группы необходимо погасить все долги
    </DefaultConfirm>
  );
};

export default GroupDebtsAlert;
