/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (func: (...args: any) => void, delay = 1000) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
