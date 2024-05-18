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
import { useShoppingListStore, useUIStore } from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';
import { toUTC } from 'utils/formatDate';

const ShoppingListEdit: React.FC = () => {
  const { closeModal, modalState } = useUIStore<{ listId: DefaultId }>();

  const { getShopingList, editShoppingList } = useShoppingListStore();

  const { register, handleSubmit, control, formState, setValue } = useForm<EditFormValues>();

  const [initial, setInitial] = React.useState<EditFormValues>();

  const init = React.useCallback(async () => {
    if (!modalState?.listId) {
      return;
    }

    const list = await getShopingList(modalState.listId);

    if (!list) {
      return;
    }

    const initialDate = list.purchaseDate ? toUTC(new Date(list.purchaseDate)) : undefined;

    setInitial({
      name: list.name,
      date: initialDate,
    });

    setValue(addListMap.name.name, list.name);
    setValue(addListMap.date.name, initialDate);
  }, [modalState?.listId]);

  React.useEffect(() => {
    init();
  }, []);

  const onSubmit = React.useCallback(async (data: EditFormValues) => {
    console.log('onSubmit', data);

    if (!modalState) {
      return;
    }

    await editShoppingList({
      id: modalState.listId,
      name: data.name.trim(),
      purchaseDate: data.date,
    });

    closeModal();
  }, []);

  const initialDate = initial ? initial[addListMap.date.name] : undefined;

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
