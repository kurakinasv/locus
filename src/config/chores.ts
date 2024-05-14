import { OptionType } from 'typings/ui';

export const tabs: OptionType<string>[] = [
  {
    label: 'Расписание',
    value: 'schedule',
  },
  {
    label: 'Задачи',
    value: 'chores',
  },
];

export type ScheduleFrequency = 'daily' | 'weekly' | 'monthly' | 'never';

export type AlternatingMethod = 'one-by-one' | 'single' | 'anyone';

export const scheduleFrequencyOptions: OptionType<ScheduleFrequency>[] = [
  {
    label: 'Ежедневно',
    value: 'daily',
  },
  {
    label: 'Еженедельно',
    value: 'weekly',
  },
  {
    label: 'Ежемесячно',
    value: 'monthly',
  },
  {
    label: 'Не повторять',
    value: 'never',
  },
];

export const CREATE_CATEGORY_ID = '0';

export const CREATE_CATEGORY_OPTION: OptionType<string> = {
  label: 'Создать категорию',
  value: CREATE_CATEGORY_ID,
};
