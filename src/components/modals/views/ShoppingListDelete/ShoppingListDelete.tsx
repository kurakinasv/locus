import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { useShoppingListStore, useUIStore } from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';
import { noop } from 'utils/noop';

const ShoppingListDelete: React.FC = () => {
  const { modalState } = useUIStore<{ listId: DefaultId }>();
  const { deleteShoppingList } = useShoppingListStore();

  const handleDelete = React.useCallback(async () => {
    if (!modalState?.listId) {
      return;
    }

    await deleteShoppingList(modalState.listId);
  }, [modalState?.listId]);

  return (
    <DefaultConfirm
      confirmAction={handleDelete}
      confirmButton="Удалить"
      cancelButton="Отмена"
      cancelAction={noop}
    >
      Удалить список покупок и&nbsp;все его элементы? Данные нельзя будет восстановить
    </DefaultConfirm>
  );
};

export default observer(ShoppingListDelete);
