import * as React from 'react';

import { useForm } from 'react-hook-form';

import { FormWrapper } from 'components/modals/components';
import { Spacing } from 'components/Spacing';
import { Title } from 'components/Title';
import { UsersSlider } from 'components/UsersSlider';
import { EditFormValues } from 'entities/expense/form';
import { useUsersSelect } from 'hooks/useUsersSelect';

// import s from './ExpensesEdit.module.scss';

const ExpensesEdit: React.FC = () => {
  const { handleSubmit, control, formState, watch } = useForm<EditFormValues>();

  const { onUserClick, users } = useUsersSelect();

  const onSubmit = React.useCallback(async (data: EditFormValues) => {}, []);

  return (
    <FormWrapper<EditFormValues>
      handleSubmit={handleSubmit(onSubmit)}
      formState={formState}
      actionButtonLabel="Создать"
      hasCancelButton
    >
      <Spacing size={1.4} />
      <div>
        <Title size="h2">Исполнители</Title>
        <Spacing size={1.4} />
        <UsersSlider users={users} onUserClick={onUserClick} />
      </div>
      <Spacing size={3} />
    </FormWrapper>
  );
};

export default ExpensesEdit;
