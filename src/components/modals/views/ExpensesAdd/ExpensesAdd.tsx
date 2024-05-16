import * as React from 'react';

import cn from 'classnames';
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
import { SnackbarType } from 'config/snackbar';
import { addExpenseMap, CreateFormValues } from 'entities/expense/form';
import { ExpenseCreateParams } from 'entities/expense/params';
import {
  ExpenseCategoryIcon,
  expenseCategoryIconsMap,
  expenseCategoryIconsNames,
} from 'entities/expenseCategory';
import { useUsersSelect } from 'hooks/useUsersSelect';
import { useExpenseCategoriesStore, useExpensesStore, useUIStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';

import RubleIcon from 'img/icons/ruble.svg?react';

import s from './ExpensesAdd.module.scss';

const ExpensesAdd: React.FC = () => {
  const { closeModal, snackbar } = useUIStore();

  const { createExpense } = useExpensesStore();
  const { categoriesOptionsWithCreate, createCategory } = useExpenseCategoriesStore();

  const { register, handleSubmit, control, formState, watch } = useForm<CreateFormValues>();

  const { onUserClick, users } = useUsersSelect();

  const [selectedIcon, setIcon] = React.useState<ExpenseCategoryIcon>('other');

  const option = watch(addExpenseMap.category.name);
  const createNewCategory = option === CREATE_CATEGORY_ID;

  const onSubmit = React.useCallback(
    async (data: CreateFormValues) => {
      if (!users.some((user) => user.selected)) {
        snackbar.open(SnackbarType.chooseOneUser);
        return;
      }

      let categoryId;

      if (createNewCategory && data.categoryName) {
        const category = await createCategory({ name: data.categoryName, icon: selectedIcon });

        if (!category) {
          return;
        }

        categoryId = category.id;
      }

      const selectedUsers = users.filter((user) => user.selected).map((user) => user.id);

      const createParams: ExpenseCreateParams = {
        amount: data.amount,
        categoryId: createNewCategory && categoryId ? categoryId : Number(data.category),
        description: data.description,
        name: data.name.trim(),
        purchaseDate: data.purchaseDate,
        usersIds: selectedUsers,
      };

      console.log('onSubmit', data, selectedUsers);

      const created = await createExpense(createParams);

      if (!created) {
        return;
      }

      closeModal();
    },
    [users]
  );

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
          className={cn(
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
          <Input
            {...field}
            {...addExpenseMap.name}
            value={field.value}
            {...register(addExpenseMap.name.name)}
            errorMessage={
              formState.errors[addExpenseMap.name.name]?.type ? VALIDATION_MESSAGES.required : ''
            }
            touched={!!formState.errors[addExpenseMap.name.name]?.type}
          />
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
          <Controller<CreateFormValues>
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
          <Input
            {...field}
            {...addExpenseMap.amount}
            icon={RubleIcon}
            value={field.value}
            {...register(addExpenseMap.amount.name)}
            errorMessage={
              formState.errors[addExpenseMap.amount.name]?.type ? VALIDATION_MESSAGES.required : ''
            }
            touched={!!formState.errors[addExpenseMap.amount.name]?.type}
          />
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

export default ExpensesAdd;
