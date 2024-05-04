import { useContext } from 'react';

import { rootStoreContext } from './context';

export const useRootStore = () => {
  const store = useContext(rootStoreContext);

  if (!store) {
    throw new Error('Cannot use RootStore outside the Provider');
  }

  return store;
};

export const useUserStore = () => {
  return useRootStore().userStore;
};

export const useUIStore = () => {
  return useRootStore().uiStore;
};
