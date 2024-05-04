import { useCallback, useState } from 'react';

export const useSnackbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSnackbar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openSnackbar = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    closeSnackbar,
    openSnackbar,
  };
};
