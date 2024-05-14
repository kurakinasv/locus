import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { noop } from 'utils/noop';

const ShoppingListDelete: React.FC = () => {
  return (
    <DefaultConfirm
      confirmAction={noop}
      confirmButton="Удалить"
      cancelButton="Отмена"
      cancelAction={noop}
    >
      Удалить список покупок и&nbsp;все его элементы? Данные нельзя будет восстановить
    </DefaultConfirm>
  );
};

export default ShoppingListDelete;
