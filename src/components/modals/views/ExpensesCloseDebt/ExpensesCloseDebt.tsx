import * as React from 'react';

import { useForm } from 'react-hook-form';

import { FormWrapper } from 'components/modals/components';
import { Spacing } from 'components/Spacing';
import { DebtFormValues } from 'entities/expense/form';

// import s from './ExpensesCloseDebt.module.scss';

const ExpensesCloseDebt: React.FC = () => {
  const { handleSubmit, control, formState, watch } = useForm<DebtFormValues>();

  const onSubmit = React.useCallback(async (data: DebtFormValues) => {}, []);

  return (
    <FormWrapper<DebtFormValues>
      handleSubmit={handleSubmit(onSubmit)}
      formState={formState}
      actionButtonLabel="Создать"
      hasCancelButton
    >
      <Spacing size={1.4} />

      <Spacing size={3} />
    </FormWrapper>
  );
};

export default ExpensesCloseDebt;
