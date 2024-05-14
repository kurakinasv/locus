import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { noop } from 'utils/noop';

const ExpensesDelete: React.FC = () => {
  return (
    <DefaultConfirm
      cancelButton="Отмена"
      confirmAction={noop}
      confirmButton="Удалить"
    ></DefaultConfirm>
  );
};

export default ExpensesDelete;
