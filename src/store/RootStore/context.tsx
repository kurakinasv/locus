import { FC, PropsWithChildren, createContext } from 'react';

import RootStore from './RootStore';

const rootStore = new RootStore();

export const rootStoreContext = createContext<RootStore>(rootStore);

const RootStoreContextProvider = rootStoreContext.Provider;

const RootStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  return <RootStoreContextProvider value={rootStore}>{children}</RootStoreContextProvider>;
};

export default RootStoreProvider;
