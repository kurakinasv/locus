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
