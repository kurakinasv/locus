// todo: make it locale independent
export const formatLocaleDateToDDMM = (date: string) => {
  const [day, month] = date.split('.');
  return `${day}.${month}`;
};
