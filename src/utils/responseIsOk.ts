import { AxiosResponse } from 'axios';

export const responseIsOk = (response: AxiosResponse): boolean => {
  return response.status >= 200 && response.status < 400;
};
