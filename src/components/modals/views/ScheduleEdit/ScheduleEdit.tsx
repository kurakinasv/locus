import * as React from 'react';

import { observer } from 'mobx-react-lite';
import { useForm, Controller, FieldValues } from 'react-hook-form';

import { Button, ButtonTheme } from 'components/Button';
import { DatePickerInput } from 'components/DatePickerInput';
import { Dropdown } from 'components/Dropdown';
import { ErrorMessageLabel } from 'components/ErrorMessageLabel';
import { Spacing } from 'components/Spacing';
import { Title } from 'components/Title';
import { UsersSlider } from 'components/UsersSlider';
import { WarningBlock } from 'components/WarningBlock';
import { ScheduleFrequency, scheduleFrequencyOptions } from 'config/chores';
import { VALIDATION_MESSAGES } from 'config/form';
import { SnackbarType } from 'config/snackbar';
import {
  FormFields,
  createScheduleMap,
  dateLabel,
  rangeDateEditLabel,
} from 'entities/schedule/form';
import { User } from 'entities/user';
import {
  UsersSelectListType,
  chooseMultipleUsers,
  chooseSingleUser,
  initializeUsers,
} from 'entities/user/service';
import { useScreenType } from 'store';
import {
  useChoresStore,
  useGroupMemberStore,
  useGroupStore,
  useSchedulesStore,
  useUIStore,
} from 'store/RootStore/hooks';
import { DefaultId } from 'typings/api';
import { toUTC } from 'utils/formatDate';

import s from './ScheduleEdit.module.scss';

const ScheduleEdit: React.FC = () => {
  const { closeModal, snackbar, modalState } = useUIStore<{ scheduleId: DefaultId }>();

  const screen = useScreenType();
  const isMobile = screen === 'mobile';

  const { group } = useGroupStore();
  const { choresOptions } = useChoresStore();
  const { activeSchedule, setActiveSchedule, editSchedule, getSchedule } = useSchedulesStore();
  const { userGroupIdByUserId } = useGroupMemberStore();

  const { handleSubmit, control, formState, watch, setValue } = useForm<FormFields>();

  const [initial, setInitial] = React.useState<FormFields>();

  const frequency: ScheduleFrequency | undefined = watch('frequency');
  const noRepeat = frequency === 'never';

  React.useEffect(() => {
    return () => {
      setActiveSchedule(null);
    };
  }, []);

  const [users, setUsers] = React.useState<UsersSelectListType>(() =>
    group?.users ? initializeUsers(group.users) : []
  );

  const init = React.useCallback(async () => {
    if (!modalState?.scheduleId) {
      return;
    }

    const schedule = await getSchedule(modalState.scheduleId);

    if (!schedule || !group?.users) {
      return;
    }

    setInitial({
      choreId: String(schedule.choreId),
      frequency: schedule.frequency as ScheduleFrequency,
      range: {
        from: new Date(schedule.dateStart),
        to: new Date(schedule.dateEnd),
      },
      date: new Date(schedule.dateStart),
    });

    const choreOption = choresOptions.find((option) => option.value === String(schedule.choreId));

    setValue(createScheduleMap.choreId.name, choreOption?.value ?? '');
    setValue(createScheduleMap.frequency.name, schedule.frequency);

    if (schedule.frequency === 'never') {
      setValue(createScheduleMap.date.name, new Date(schedule.dateStart));
    } else {
      setValue(createScheduleMap.range.name, {
        from: new Date(schedule.dateStart),
        to: new Date(schedule.dateEnd),
      });
    }

    const usersList = group.users.reduce(
      (prev, user) => [
        ...prev,
        { ...user, selected: schedule.userGroupIds.includes(userGroupIdByUserId[user.id]) },
      ],
      [] as UsersSelectListType
    );

    setUsers(usersList);
  }, [choresOptions, group?.users, modalState?.scheduleId, userGroupIdByUserId]);

  React.useEffect(() => {
    init();
  }, []);

  const onUserClick = React.useCallback(
    (id: User['id']) => () => {
      setUsers((prev) => (noRepeat ? chooseSingleUser(prev, id) : chooseMultipleUsers(prev, id)));
    },
    [noRepeat]
  );

  const onSubmit = React.useCallback(
    async (data: FieldValues) => {
      if (!users.some((user) => user.selected)) {
        snackbar.open(SnackbarType.chooseOneUser);
        return;
      }

      if (!modalState?.scheduleId) {
        return;
      }

      await editSchedule({
        scheduleId: modalState?.scheduleId,
        dateEnd: data.frequency === 'never' ? data.date : data.range.to,
        // users: users.filter((user) => user.selected).map((user) => user.id),
      });

      closeModal();
    },
    [users, modalState?.scheduleId]
  );

  if (!activeSchedule) {
    return null;
  }

  const initialDate = initial ? toUTC(initial[createScheduleMap.date.name]) : undefined;

  const initialRange = initial
    ? {
        from: toUTC(initial[createScheduleMap.range.name].from),
        to: toUTC(initial[createScheduleMap.range.name].to),
      }
    : undefined;

  return (
    <>
      <WarningBlock>
        Изменение расписания изменит все незавершенные запланированные задачи, созданные
        по&nbsp;этому расписанию, начиная с&nbsp;сегодняшнего дня
      </WarningBlock>
      <Spacing size={1.4} />

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.flex}>
          <Controller
            control={control}
            name={createScheduleMap.choreId.name}
            defaultValue={initial?.[createScheduleMap.choreId.name]}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <>
                  <Dropdown
                    {...field}
                    options={choresOptions}
                    selectedOption={field.value}
                    onChange={field.onChange}
                    placeholder={createScheduleMap.choreId.placeholder}
                    stretched
                    disabled
                  />
                  <ErrorMessageLabel
                    errors={formState.errors}
                    name={createScheduleMap.choreId.name}
                    message={VALIDATION_MESSAGES.required}
                  />
                </>
              );
            }}
          />
          <Spacing size={1.4} />
          <Controller
            control={control}
            name={createScheduleMap.frequency.name}
            defaultValue={initial?.[createScheduleMap.frequency.name]}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Dropdown
                  {...field}
                  options={scheduleFrequencyOptions}
                  selectedOption={field.value}
                  onChange={field.onChange}
                  placeholder={createScheduleMap.frequency.placeholder}
                  stretched
                  disabled
                />
                <ErrorMessageLabel
                  errors={formState.errors}
                  name={createScheduleMap.frequency.name}
                  message={VALIDATION_MESSAGES.required}
                />
              </>
            )}
          />
          {frequency && !noRepeat && (
            <>
              <Spacing size={1.4} />
              <Controller<FormFields>
                control={control}
                name={createScheduleMap.range.name}
                defaultValue={initialRange}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePickerInput
                    {...field}
                    {...createScheduleMap.range}
                    defaultRange={initialRange}
                    mode="range"
                    range={field.value}
                    setRange={field.onChange}
                    stretched
                    label={rangeDateEditLabel}
                    touched
                    errorMessage={
                      formState.errors[createScheduleMap.range.name]?.type === 'required'
                        ? VALIDATION_MESSAGES.required
                        : undefined
                    }
                  />
                )}
              />
            </>
          )}
          {frequency && noRepeat && (
            <>
              <Spacing size={1.4} />
              <Controller<FormFields>
                control={control}
                name={createScheduleMap.date.name}
                defaultValue={initialDate}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePickerInput
                    {...field}
                    {...createScheduleMap.date}
                    mode="single"
                    defaultDate={initialDate}
                    selectedDate={field.value}
                    setSelectedDate={field.onChange}
                    stretched
                    label={dateLabel}
                    touched
                    errorMessage={
                      formState.errors[createScheduleMap.date.name]?.type === 'required'
                        ? VALIDATION_MESSAGES.required
                        : undefined
                    }
                  />
                )}
              />
            </>
          )}
          <Spacing size={1.4} />
          <div>
            <Title size="h2">Исполнители</Title>
            <Spacing size={1.4} />
            <UsersSlider users={users} onUserClick={onUserClick} disabled />
          </div>
          <Spacing size={3} />
        </div>

        <div className={s['footer-buttons']}>
          <Button
            theme={ButtonTheme.outlined}
            stretched
            disabled={formState.isSubmitting}
            loading={formState.isSubmitting}
            closesModal
          >
            Отменить
          </Button>
          <Spacing size={1} horizontal={!isMobile} stretched />
          <Button
            stretched
            type="submit"
            disabled={
              !formState.isDirty ||
              !Object.keys(formState.dirtyFields).length ||
              formState.isSubmitting
            }
            loading={formState.isSubmitting}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </>
  );
};

export default observer(ScheduleEdit);
