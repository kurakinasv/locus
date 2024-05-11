import { FC, useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { ModalRoot } from 'components/modals';
import { Snackbar } from 'components/Snackbar';
import { BREAKPOINTS } from 'config/app';
import { ScreenTypeProvider, ScreenType } from 'store';
import { useUIStore } from 'store/RootStore/hooks';

const Main: FC = () => {
  const [viewport, setViewport] = useState<ScreenType>('desktop');
  const { modal, onOpenChange } = useUIStore();

  useEffect(() => {
    const width = window.screen.width;
    const isMobile = width < BREAKPOINTS.desktop;

    setViewport(isMobile ? 'mobile' : 'desktop');
  }, []);

  return (
    <ScreenTypeProvider value={viewport}>
      <Dialog.Root open={!!modal} onOpenChange={onOpenChange}>
        <Outlet />
        <ModalRoot />
      </Dialog.Root>
      <Snackbar />
    </ScreenTypeProvider>
  );
};

export default observer(Main);
