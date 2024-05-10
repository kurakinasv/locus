import { isAxiosError } from 'axios';

import { SNACKBAR_CONFIG } from 'config/snackbar';

export const getErrorMsg = (err: unknown): string => {
  if (import.meta.env.DEV) {
    console.error(
      'getErrorMsg',
      isAxiosError(err)
        ? err.response?.data.message
        : err instanceof Error
          ? err.message
          : 'unknown error',
      err
    );
  }

  if (isAxiosError(err)) {
    return err.response?.data.message;
  }

  if (err instanceof Error) {
    return SNACKBAR_CONFIG.error.message;
  }

  return SNACKBAR_CONFIG.error.message;
};
