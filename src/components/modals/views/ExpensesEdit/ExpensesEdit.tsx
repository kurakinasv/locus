import * as React from 'react';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';

import { Button, ButtonTheme } from 'components/Button';
import { DatePickerInput } from 'components/DatePickerInput';
import { Dropdown } from 'components/Dropdown';
import { ErrorMessageLabel } from 'components/ErrorMessageLabel';
import { Input } from 'components/Input';
import { FormWrapper } from 'components/modals/components';
import { Spacing } from 'components/Spacing';
import { Text } from 'components/Text';
import { Title } from 'components/Title';
import { UsersSlider } from 'components/UsersSlider';
import { CREATE_CATEGORY_ID } from 'config/chores';
import { VALIDATION_MESSAGES } from 'config/form';
import { EditFormValues, addExpenseMap } from 'entities/expense/form';
import {
  ExpenseCategoryIcon,
  expenseCategoryIconsMap,
  expenseCategoryIconsNames,
} from 'entities/expenseCategory';
import { UsersSelectListType } from 'entities/user/service';
import { useUsersSelect } from 'hooks/useUsersSelect';
import {
  useExpenseCategoriesStore,
  useExpensesStore,
  useGroupMemberStore,
  useGroupStore,
  useUIStore,
} from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';
import { SizeEnum } from 'typings/ui';
import { cutTimezone, toUTC } from 'utils/formatDate';

import s from './ExpensesEdit.module.scss';

const ExpensesEdit: React.FC = () => {
  const { closeModal, modalState } = useUIStore<{ expenseId: DefaultId }>();

  const { group } = useGroupStore();
  const { userGroupIdByUserId } = useGroupMemberStore();
  const { getExpense, editExpense } = useExpensesStore();
  const { categoriesOptionsWithCreate, categoriesOptions } = useExpenseCategoriesStore();

  const { register, handleSubmit, control, formState, setValue, watch } = useForm<EditFormValues>();

  const { onUserClick, users, setUsers, touched } = useUsersSelect();

  const [initial, setInitial] = React.useState<EditFormValues>();
  const [selectedIcon, setIcon] = React.useState<ExpenseCategoryIcon>('other');

  const option = watch(addExpenseMap.category.name);
  const createNewCategory = option === CREATE_CATEGORY_ID;

  const init = React.useCallback(async () => {
    if (!modalState?.expenseId) {
      return;
    }

    const expense = await getExpense(modalState.expenseId);

    if (!expense || !group?.users) {
      return;
    }

    setInitial({
      name: expense.name,
      amount: expense.amount,
      description: expense.description ?? '',
      category: String(expense.categoryId),
      purchaseDate: cutTimezone(new Date(expense.purchaseDate)),
      users,
    });

    setValue(addExpenseMap.name.name, expense.name);
    setValue(addExpenseMap.amount.name, expense.amount);
    setValue(addExpenseMap.description.name, expense.description ?? '');
    setValue(addExpenseMap.category.name, String(expense.categoryId));
    // to fix calendar date display
    setValue(addExpenseMap.purchaseDate.name, cutTimezone(new Date(expense.purchaseDate)));

    const usersList = group.users.reduce(
      (prev, user) => [
        ...prev,
        { ...user, selected: expense.userGroupIds.includes(userGroupIdByUserId[user.id]) },
      ],
      [] as UsersSelectListType
    );

    setUsers(usersList);
  }, [group?.users, modalState?.expenseId, userGroupIdByUserId, categoriesOptions, users]);

  React.useEffect(() => {
    init();
  }, []);

  const onSubmit = React.useCallback(async (data: EditFormValues) => {
    console.log('onSubmit', data);

    if (!modalState) {
      return;
    }

    await editExpense({
      id: modalState.expenseId,
      amount: Number(data.amount),
      categoryId: Number(data.category),
      name: data.name,
      description: data.description,
      purchaseDate: data.purchaseDate,
      usersIds: users.map((user) => user.id),
    });

    closeModal();
  }, []);

  const onChooseIcon = (category: ExpenseCategoryIcon) => () => {
    setIcon(category);
  };

  // todo: move to component
  const icons = React.useMemo(() => {
    return expenseCategoryIconsNames.map((icon) => {
      const Icon = expenseCategoryIconsMap[icon];

      return (
        <Button
          key={icon}
          theme={ButtonTheme.text}
          size={SizeEnum.s}
          className={classNames(
            s['category-button'],
            icon === selectedIcon && s['category-button_selected']
          )}
          onClick={onChooseIcon(icon)}
          type="button"
        >
          <Icon className={s.icon} />
        </Button>
      );
    });
  }, [selectedIcon]);

  const initialDate = initial ? toUTC(initial[addExpenseMap.purchaseDate.name]) : undefined;

  return (
    <FormWrapper<EditFormValues>
      handleSubmit={handleSubmit(onSubmit)}
      formState={formState}
      actionButtonLabel="Сохранить"
      hasCancelButton
      isSubmitDisabled={
        !formState.isDirty ||
        (touched ? false : !Object.keys(formState.dirtyFields).length) ||
        formState.isSubmitting
      }
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
        defaultValue={initial?.[addExpenseMap.category.name]}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <Dropdown
              {...field}
              options={categoriesOptionsWithCreate}
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

      {createNewCategory && (
        <>
          <Controller<EditFormValues>
            control={control}
            name={addExpenseMap.categoryName.name}
            rules={{ required: createNewCategory }}
            render={({ field }) => (
              <Input
                {...field}
                {...addExpenseMap.categoryName}
                touched={!!formState.errors[addExpenseMap.categoryName.name]?.type}
                errorMessage={
                  formState.errors[addExpenseMap.categoryName.name]?.type
                    ? VALIDATION_MESSAGES.required
                    : ''
                }
              />
            )}
          />
          <Spacing size={1} />
          <Text color="gray">Выберите иконку категории</Text>
          <Spacing size={1} />
          <div className={s['category-icons']}>{icons}</div>
          <Spacing size={1.4} />
        </>
      )}

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
        defaultValue={initialDate}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePickerInput
            {...field}
            {...addExpenseMap.purchaseDate}
            mode="single"
            selectedDate={field.value}
            setSelectedDate={field.onChange}
            defaultDate={initialDate}
            stretched
            fromToday={false}
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

export default observer(ExpensesEdit);
