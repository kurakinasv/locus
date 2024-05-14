import * as React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { DatePickerInput } from 'components/DatePickerInput';
import { Dropdown } from 'components/Dropdown';
import { ErrorMessageLabel } from 'components/ErrorMessageLabel';
import { Input } from 'components/Input';
import { FormWrapper } from 'components/modals/components';
import { Spacing } from 'components/Spacing';
import { Title } from 'components/Title';
import { UsersSlider } from 'components/UsersSlider';
import { VALIDATION_MESSAGES } from 'config/form';
import { mockOptions } from 'config/mock/options';
import { SnackbarType } from 'config/snackbar';
import { addExpenseMap, CreateFormValues } from 'entities/expense/form';
import { useUsersSelect } from 'hooks/useUsersSelect';
import { useUIStore } from 'store/RootStore/hooks';

const ExpensesAdd: React.FC = () => {
  const { closeModal, snackbar } = useUIStore();

  const { register, handleSubmit, control, formState } = useForm<CreateFormValues>();

  const { onUserClick, users } = useUsersSelect();

  const onSubmit = React.useCallback(
    async (data: CreateFormValues) => {
      if (!users.some((user) => user.selected)) {
        snackbar.open(SnackbarType.chooseOneUser);
        return;
      }

      const selectedUsers = users.filter((user) => user.selected).map((user) => user.id);

      const createParams = {};

      console.log('onSubmit', data, selectedUsers);

      // const created = await createSchedule(createParams);

      // if (!created) {
      //   return;
      // }

      closeModal();
    },
    [users]
  );

  return (
    <FormWrapper<CreateFormValues>
      handleSubmit={handleSubmit(onSubmit)}
      formState={formState}
      actionButtonLabel="Создать"
    >
      <Controller<CreateFormValues>
        control={control}
        name={addExpenseMap.name.name}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              {...addExpenseMap.name}
              value={field.value}
              {...register(addExpenseMap.name.name)}
            />
            <ErrorMessageLabel
              errors={formState.errors}
              name={addExpenseMap.name.name}
              message={VALIDATION_MESSAGES.required}
            />
          </>
        )}
      />
      <Spacing size={1.4} />
      <Controller<CreateFormValues>
        control={control}
        name={addExpenseMap.category.name}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <Dropdown
              {...field}
              options={mockOptions}
              selectedOption={field.value}
              onChange={field.onChange}
              {...addExpenseMap.category}
              stretched
            />
            <ErrorMessageLabel
              errors={formState.errors}
              name={addExpenseMap.category.name}
              message={VALIDATION_MESSAGES.required}
            />
          </>
        )}
      />
      <Spacing size={1.4} />
      <Controller<CreateFormValues>
        control={control}
        name={addExpenseMap.description.name}
        render={({ field }) => (
          <Input
            {...field}
            {...addExpenseMap.description}
            value={field.value}
            {...register(addExpenseMap.description.name)}
          />
        )}
      />
      <Spacing size={1.4} />
      <Controller<CreateFormValues>
        control={control}
        name={addExpenseMap.amount.name}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              {...addExpenseMap.amount}
              value={field.value}
              {...register(addExpenseMap.amount.name)}
            />
            <ErrorMessageLabel
              errors={formState.errors}
              name={addExpenseMap.amount.name}
              message={VALIDATION_MESSAGES.required}
            />
          </>
        )}
      />
      <Spacing size={1.4} />
      <Controller<CreateFormValues>
        control={control}
        name={addExpenseMap.purchaseDate.name}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePickerInput
            {...field}
            {...addExpenseMap.purchaseDate}
            mode="single"
            selectedDate={field.value}
            setSelectedDate={field.onChange}
            stretched
            touched
            errorMessage={
              formState.errors[addExpenseMap.purchaseDate.name]?.type === 'required'
                ? VALIDATION_MESSAGES.required
                : undefined
            }
          />
        )}
      />
      <Spacing size={1.4} />
      <div>
        <Title size="h2">Кто разделяет</Title>
        <Spacing size={1.4} />
        <UsersSlider users={users} onUserClick={onUserClick} />
      </div>
      <Spacing size={3} />
    </FormWrapper>
  );
};

export default ExpensesAdd;
