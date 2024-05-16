import { useContext } from 'react';

import UIStore from 'store/UIStore';

import { rootStoreContext } from './context';

export const useRootStore = () => {
  const store = useContext(rootStoreContext);

  if (!store) {
    throw new Error('Cannot use RootStore outside the Provider');
  }

  return store;
};

export const useUIStore = <ModalStateT>() => {
  return useRootStore().uiStore as UIStore<ModalStateT>;
};

export const useUserStore = () => {
  return useRootStore().userStore;
};

export const useAuthStore = () => {
  return useRootStore().authStore;
};

export const useGroupStore = () => {
  return useRootStore().groupStore;
};

export const useGroupMemberStore = () => {
  return useRootStore().groupMemberStore;
};

export const useChoresStore = () => {
  return useRootStore().choresStore;
};

export const useChoreCategoriesStore = () => {
  return useRootStore().choreCategoriesStore;
};

export const useSchedulesStore = () => {
  return useRootStore().schedulesStore;
};

export const useExpensesStore = () => {
  return useRootStore().expensesStore;
};
