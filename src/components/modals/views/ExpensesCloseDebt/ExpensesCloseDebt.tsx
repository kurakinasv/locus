import * as React from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';

import { ErrorMessageLabel } from 'components/ErrorMessageLabel';
import { Input } from 'components/Input';
import { FormWrapper } from 'components/modals/components';
import { Spacing } from 'components/Spacing';
import { Text } from 'components/Text';
import { UserCard } from 'components/UserCard';
import { VALIDATION_MESSAGES } from 'config/form';
import { ExpenseWithDebt } from 'entities/expense';
import { DebtFormValues, addExpenseMap } from 'entities/expense/form';
import { useExpensesStore, useGroupStore, useUIStore } from 'store/RootStore/hooks';

import ArrowIcon from 'img/icons/arrow-left.svg?react';
import RubleIcon from 'img/icons/ruble.svg?react';

import s from './ExpensesCloseDebt.module.scss';

const ExpensesCloseDebt: React.FC = () => {
  const { closeModal, modalState } = useUIStore<{ expense: ExpenseWithDebt }>();

  const { group } = useGroupStore();
  const { editUserDebt, meta } = useExpensesStore();

  const { handleSubmit, control, formState, register, watch } = useForm<DebtFormValues>();

  const amountField = watch('amount');

  const user = group?.users?.[0];

  const onSubmit = React.useCallback(
    async (data: DebtFormValues) => {
      if (!modalState?.expense) {
        return;
      }

      await editUserDebt({ expenseId: modalState?.expense?.id, amountToPay: data.amount });

      closeModal();
    },
    [modalState?.expense]
  );

  if (!user || !modalState?.expense) {
    return null;
  }

  const { debtAmount, amount, createdBy, name, description } = modalState.expense;

  return (
    <>
      <div className={s.users}>
        <div className={s.user}>
          <UserCard name={user.username} selected replaceCurrentUserName />
          <Spacing size={0.6} />
          <div className={cn(s.debt, s.debt_red)}>
            Долг: <span>{debtAmount.toLocaleString('ru-RU')}</span>
          </div>
        </div>

        <Spacing size={3} horizontal />
        <ArrowIcon className={s.arrow} />
        <Spacing size={3} horizontal />

        <div className={s.user}>
          <UserCard name={group.users.find((u) => u.id === createdBy)?.username ?? ''} selected />
          <Spacing size={0.6} />
          <div className={cn(s.debt, s.debt_green)}>
            Заплачено: <span>{Number(amount).toLocaleString('ru-RU')}</span>
          </div>
        </div>
      </div>

      <Spacing size={3} />

      <div className={s.field}>
        <div className={s.field__wrapper}>
          <h3 className={s.title}>{name}</h3>
          {description && (
            <>
              <Spacing size={0.4} />
              <Text color="gray">{description}</Text>
            </>
          )}
          <Spacing size={1} />
        </div>
      </div>

      <FormWrapper<DebtFormValues>
        handleSubmit={handleSubmit(onSubmit)}
        formState={formState}
        actionButtonLabel="Подтвердить"
        hasCancelButton
        isSubmitDisabled={
          (formState.isDirty && amountField === undefined) ||
          !!formState.isSubmitting ||
          !!Object.keys(formState.errors).length ||
          meta.editUserDebt.loading
        }
      >
        <div className={s.field}>
          <div className={s.field__wrapper}>
            <Controller<DebtFormValues>
              control={control}
              name={addExpenseMap.amount.name}
              rules={{
                required: { value: true, message: VALIDATION_MESSAGES.required },
                min: { value: 1, message: `${VALIDATION_MESSAGES.minSum}1` },
                max: { value: debtAmount, message: `${VALIDATION_MESSAGES.maxSum}${debtAmount}` },
              }}
              defaultValue={debtAmount}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    {...addExpenseMap.amount}
                    value={field.value}
                    {...register(addExpenseMap.amount.name, {
                      valueAsNumber: true,
                      validate: (v) => v > 0 && v <= debtAmount,
                    })}
                    onChange={field.onChange}
                    icon={RubleIcon}
                  />
                  <ErrorMessageLabel errors={formState.errors} name={addExpenseMap.amount.name} />
                </>
              )}
            />
          </div>
        </div>
        <Spacing size={3} />
      </FormWrapper>
    </>
  );
};

export default observer(ExpensesCloseDebt);
