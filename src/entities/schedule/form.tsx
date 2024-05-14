import { FieldValues } from 'react-hook-form';

import { ScheduleFrequency } from 'config/chores';
import { UUIDString } from 'typings/api';

export type FormFields = FieldValues & {
  choreId: UUIDString;
  frequency: ScheduleFrequency;
  range: {
    from: Date;
    to: Date;
  };
  date: Date;
};

type FieldConfig = {
  name: string;
  placeholder: string;
};

export const createScheduleMap = {
  choreId: {
    name: 'choreId',
    placeholder: 'Выбрать задачу',
  },
  frequency: {
    name: 'frequency',
    placeholder: 'Периодичность',
  },
  range: {
    name: 'range',
    placeholder: 'Дата начала и окончания',
  },
  date: {
    name: 'date',
    placeholder: 'Дата выполнения задачи',
  },
} as const satisfies Record<keyof FormFields, FieldConfig>;

export const rangeDateLabel = (
  <>
    Дата начала&nbsp;&mdash; дата первого выполнения задачи одним из&nbsp;участников группы. Дата
    окончания&nbsp;&mdash; дата последнего выполнения задачи. Она может не&nbsp;совпадать
    с&nbsp;фактическим последним днем в&nbsp;зависимости от&nbsp;выбранной периодичности
  </>
);

export const rangeDateEditLabel = (
  <>
    Выберите новую дату окончания повторения задач для этого расписания. Дата начала повторений
    не&nbsp;изменится
  </>
);

export const dateLabel = 'Задача должна будет выполниться один раз';
