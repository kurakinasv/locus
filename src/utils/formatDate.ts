import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

// todo: make it locale independent
export const formatLocaleDateToDDMM = (date: string) => {
  const [day, month] = date.split('.');
  return `${day}.${month}`;
};

export const formatLocaleToLongDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .split(' г.')[0];
};

export const cutTimezone = (date: string | Date): Date => {
  let utcMillisecondsTo = 0;

  if (date instanceof Date) {
    utcMillisecondsTo = date.getTime() - date.getTimezoneOffset() * 60 * 1000;
  }

  if (typeof date === 'string') {
    utcMillisecondsTo = new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60 * 1000;
  }

  return new Date(utcMillisecondsTo);
};

export const toUTC = (date: Date) => {
  const utc = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  return utc;
};

export const getDaysNames = () => {
  const locale = navigator.language;

  const today = locale === 'ru-RU' ? 'Сегодня' : 'Today';
  const tomorrow = locale === 'ru-RU' ? 'Завтра' : 'Tomorrow';
  const yesterday = locale === 'ru-RU' ? 'Вчера' : 'Yesterday';

  return { today, tomorrow, yesterday };
};

export const formatDayFullMonthDate = (date: Date) => {
  const locale = navigator.language;

  return format(date, 'd MMMM', {
    locale: locale === 'ru-RU' ? ru : enUS,
  });
};
