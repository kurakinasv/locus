import * as React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { DatePickerInput } from 'components/DatePickerInput';
import { ErrorMessageLabel } from 'components/ErrorMessageLabel';
import { Input } from 'components/Input';
import { FormWrapper } from 'components/modals/components';
import { Spacing } from 'components/Spacing';
import { VALIDATION_MESSAGES } from 'config/form';
import { MOCK_SHOPPING_LISTS } from 'entities/mock/shoppingList';
import { EditFormValues, addListMap } from 'entities/shoppingList/form';
import { useUIStore } from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';
import { toUTC } from 'utils/formatDate';

// import s from './ShoppingListEdit.module.scss';

const ShoppingListEdit: React.FC = () => {
  const { closeModal, modalState } = useUIStore<{ listId: DefaultId }>();

  const { register, handleSubmit, control, formState } = useForm<EditFormValues>();

  const [initial, setInitial] = React.useState<EditFormValues>();

  const init = React.useCallback(async () => {
    if (!modalState?.listId) {
      return;
    }

    const list = MOCK_SHOPPING_LISTS[0];

    if (!list) {
      return;
    }

    setInitial({
      name: list.name,
      date: new Date(list.purchaseDate),
    });
  }, []);

  React.useEffect(() => {
    init();
  }, []);

  const onSubmit = React.useCallback(async (data: EditFormValues) => {
    console.log('onSubmit', data);

    // await editList({})

    closeModal();
  }, []);

  const initialDate = initial ? toUTC(initial[addListMap.date.name]) : undefined;

  return (
    <FormWrapper
      handleSubmit={handleSubmit(onSubmit)}
      formState={formState}
      actionButtonLabel="Сохранить"
    >
      <Controller<EditFormValues>
        control={control}
        name={addListMap.name.name}
        defaultValue={MOCK_SHOPPING_LISTS[0].name}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              {...addListMap.name}
              value={field.value}
              {...register(addListMap.name.name)}
            />
            <ErrorMessageLabel
              errors={formState.errors}
              name={addListMap.name.name}
              message={VALIDATION_MESSAGES.required}
            />
          </>
        )}
      />
      <Spacing size={1.4} />
      <Controller<EditFormValues>
        control={control}
        name={addListMap.date.name}
        defaultValue={initialDate}
        rules={{ required: true }}
        render={({ field }) => (
          <DatePickerInput
            {...field}
            {...addListMap.date}
            mode="single"
            selectedDate={field.value}
            setSelectedDate={field.onChange}
            defaultDate={initialDate}
            stretched
          />
        )}
      />
      <Spacing size={3} />
    </FormWrapper>
  );
};

export default ShoppingListEdit;
