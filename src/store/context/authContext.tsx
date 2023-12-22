import { createContext, useContext } from 'react';

import { noop } from 'utils/noop';

export const authContext = createContext<{
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAuth: false,
  setIsAuth: noop,
});

export const AuthProvider = authContext.Provider;

export const useAuthContext = () => {
  return useContext(authContext);
};
