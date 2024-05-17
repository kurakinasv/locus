import * as React from 'react';

import { DefaultConfirm } from 'components/modals/DefaultConfirm';
import { ExpenseClient } from 'entities/expense';
import { useExpensesStore, useUIStore } from 'store/RootStore/hooks';
import { noop } from 'utils/noop';

const ExpensesDelete: React.FC = () => {
  const { modalState } = useUIStore<{ expenseId: ExpenseClient['id'] }>();
  const { deleteExpense } = useExpensesStore();

  const handleDelete = async () => {
    if (!modalState?.expenseId) {
      return;
    }

    await deleteExpense(modalState.expenseId);
  };

  return (
    <DefaultConfirm
      cancelButton="Отмена"
      confirmAction={handleDelete}
      confirmButton="Удалить"
      cancelAction={noop}
    >
      Удаление записи о&nbsp;расходах не&nbsp;повлияет на&nbsp;другие записи, но&nbsp;изменит общую
      статистику по&nbsp;расходам
    </DefaultConfirm>
  );
};

export default ExpensesDelete;
