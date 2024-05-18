import * as React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { DatePickerInput } from 'components/DatePickerInput';
import { ErrorMessageLabel } from 'components/ErrorMessageLabel';
import { Input } from 'components/Input';
import { FormWrapper } from 'components/modals/components';
import { Spacing } from 'components/Spacing';
import { VALIDATION_MESSAGES } from 'config/form';
import { CreateFormValues, addListMap } from 'entities/shoppingList/form';
import { useShoppingListStore, useUIStore } from 'store/RootStore/hooks';

const ShoppingListAdd: React.FC = () => {
  const { closeModal } = useUIStore();

  const { createShoppingList } = useShoppingListStore();

  const { register, handleSubmit, control, formState } = useForm<CreateFormValues>();

  const onSubmit = React.useCallback(async (data: CreateFormValues) => {
    const createParams = {
      name: data.name.trim(),
      date: data.date,
    };

    const created = await createShoppingList(createParams);

    if (!created) {
      return;
    }

    closeModal();
  }, []);

  return (
    <FormWrapper
      handleSubmit={handleSubmit(onSubmit)}
      formState={formState}
      actionButtonLabel="Создать"
    >
      <Controller<CreateFormValues>
        control={control}
        name={addListMap.name.name}
        rules={{ required: { value: true, message: VALIDATION_MESSAGES.required } }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              {...addListMap.name}
              value={field.value}
              {...register(addListMap.name.name)}
            />
            <ErrorMessageLabel errors={formState.errors} name={addListMap.name.name} />
          </>
        )}
      />
      <Spacing size={1.4} />
      <Controller<CreateFormValues>
        control={control}
        name={addListMap.date.name}
        render={({ field }) => (
          <DatePickerInput
            {...field}
            {...addListMap.date}
            mode="single"
            selectedDate={field.value}
            setSelectedDate={field.onChange}
            stretched
          />
        )}
      />
      <Spacing size={3} />
    </FormWrapper>
  );
};

export default ShoppingListAdd;
