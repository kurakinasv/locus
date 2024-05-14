import * as React from 'react';

import { useForm } from 'react-hook-form';

import { Button } from 'components/Button';
import { FormWrapper } from 'components/modals/components';
import { Spacing } from 'components/Spacing';
import { Title } from 'components/Title';
import { UsersSlider } from 'components/UsersSlider';
import { SnackbarType } from 'config/snackbar';
import { FormFields } from 'entities/schedule/form';
import { useUsersSelect } from 'hooks/useUsersSelect';
import { useGroupStore, useUIStore } from 'store/RootStore/hooks';

const ExpensesAdd: React.FC = () => {
  const { closeModal, snackbar } = useUIStore();

  const { handleSubmit, control, formState, watch } = useForm<FormFields>();

  const { onUserClick, users } = useUsersSelect();

  const onSubmit = React.useCallback(
    async (data: FormFields) => {
      if (!users.some((user) => user.selected)) {
        snackbar.open(SnackbarType.chooseOneUser);
        return;
      }

      const createParams = {};

      // const created = await createSchedule(createParams);

      // if (!created) {
      //   return;
      // }

      closeModal();
    },
    [users]
  );

  return (
    <FormWrapper<FormFields>
      handleSubmit={handleSubmit(onSubmit)}
      formState={formState}
      actionButtonLabel="Создать"
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

export default ExpensesAdd;
