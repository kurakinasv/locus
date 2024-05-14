import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { noop } from 'utils/noop';

const ExpensesDelete: React.FC = () => {
  return (
    <DefaultConfirm
      cancelButton="Отмена"
      confirmAction={noop}
      confirmButton="Удалить"
      cancelAction={noop}
    >
      Удаление записи о&nbsp;расходах не&nbsp;повлияет на&nbsp;другие записи, но&nbsp;изменит общую
      статистику по&nbsp;расходам
    </DefaultConfirm>
  );
};

export default ExpensesDelete;
