import * as React from 'react';

import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';

import { ErrorMessageLabel } from 'components/ErrorMessageLabel';
import { Input } from 'components/Input';
import { FormWrapper } from 'components/modals/components';
import { Spacing } from 'components/Spacing';
import { Text } from 'components/Text';
import { UserCard } from 'components/UserCard';
import { VALIDATION_MESSAGES } from 'config/form';
import { DebtFormValues, addExpenseMap } from 'entities/expense/form';
import { useGroupStore, useUIStore } from 'store/RootStore/hooks';
import { sleep } from 'utils/sleep';

import ArrowIcon from 'img/icons/arrow-left.svg?react';

import s from './ExpensesCloseDebt.module.scss';

const ExpensesCloseDebt: React.FC = () => {
  const { closeModal } = useUIStore();

  const { group } = useGroupStore();

  const { handleSubmit, control, formState, register } = useForm<DebtFormValues>();

  const user = group?.users?.[0];

  const onSubmit = React.useCallback(async (data: DebtFormValues) => {
    console.log('data', data);

    await sleep(1000);

    closeModal();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className={s.users}>
        <div className={s.user}>
          <UserCard name={user.username} selected />
          <Spacing size={0.6} />
          <div className={cn(s.debt, s.debt_red)}>
            Долг: <span>146</span>
          </div>
        </div>

        <Spacing size={3} horizontal />
        <ArrowIcon className={s.arrow} />
        <Spacing size={3} horizontal />

        <div className={s.user}>
          <UserCard name={user.username} selected />
          <Spacing size={0.6} />
          <div className={cn(s.debt, s.debt_green)}>
            Долг: <span>146</span>
          </div>
        </div>
      </div>

      <Spacing size={3} />

      <div className={s.field}>
        <h3 className={s.title}>Название траты</h3>
        <Spacing size={0.4} />
        <Text color="gray">
          Описание покупки описание покупки описание покупки описание покупки описание
        </Text>
        <Spacing size={1} />
      </div>

      <FormWrapper<DebtFormValues>
        handleSubmit={handleSubmit(onSubmit)}
        formState={formState}
        actionButtonLabel="Создать"
        hasCancelButton
      >
        <div className={s.field}>
          <Controller<DebtFormValues>
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
        </div>
        <Spacing size={3} />
      </FormWrapper>
    </>
  );
};

export default ExpensesCloseDebt;
