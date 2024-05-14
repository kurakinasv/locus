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
import { EditFormValues, addExpenseMap } from 'entities/expense/form';
import { MOCK_EXPENSES } from 'entities/mock/expenses';
import { UsersSelectListType } from 'entities/user/service';
import { useUsersSelect } from 'hooks/useUsersSelect';
import { useGroupMemberStore, useGroupStore, useUIStore } from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';

// import s from './ExpensesEdit.module.scss';

const ExpensesEdit: React.FC = () => {
  const { modalState } = useUIStore<{ expenseId: DefaultId }>();

  const { group } = useGroupStore();
  const { userGroupIdByUserId } = useGroupMemberStore();

  const { register, handleSubmit, control, formState } = useForm<EditFormValues>();

  const { onUserClick, users, setUsers } = useUsersSelect();

  // const [initial, setInitial] = React.useState<EditFormValues>();

  const init = React.useCallback(async () => {
    if (!modalState?.expenseId) {
      return;
    }

    // const expense = await getExpense(modalState.scheduleId);
    const expense = MOCK_EXPENSES[0];

    if (!expense || !group?.users) {
      return;
    }

    // setInitial({});

    const usersList = group.users.reduce(
      (prev, user) => [
        ...prev,
        // { ...user, selected: expense.userGroupIds.includes(userGroupIdByUserId[user.id]) },
        { ...user, selected: true },
      ],
      [] as UsersSelectListType
    );

    setUsers(usersList);
  }, [group?.users, modalState?.expenseId, userGroupIdByUserId]);

  React.useEffect(() => {
    init();
  }, []);

  const onSubmit = React.useCallback(async (data: EditFormValues) => {
    // await editExpense({})
  }, []);

  return (
    <FormWrapper<EditFormValues>
      handleSubmit={handleSubmit(onSubmit)}
      formState={formState}
      actionButtonLabel="Создать"
      hasCancelButton
    >
      <Controller<EditFormValues>
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
      <Controller<EditFormValues>
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
      <Controller<EditFormValues>
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
      <Controller<EditFormValues>
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
      <Controller<EditFormValues>
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

export default ExpensesEdit;
