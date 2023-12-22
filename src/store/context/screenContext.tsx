import { createContext, useContext } from 'react';

import { ScreenType } from './types';

export const screenTypeContext = createContext<ScreenType>('desktop');

export const ScreenTypeProvider = screenTypeContext.Provider;

export const useScreenType = () => {
  return useContext(screenTypeContext);
};
