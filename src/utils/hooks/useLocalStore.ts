import React, { useEffect, useRef } from 'react';

import { ILocalStore } from 'store/interfaces';

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const store = useRef<T>(creator());
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    store.current.destroy();
    store.current = creator();
  }, []);

  useEffect(() => {
    return () => {
      if (store.current) {
        store.current.destroy();
      }
    };
  }, []);

  return store.current;
};
