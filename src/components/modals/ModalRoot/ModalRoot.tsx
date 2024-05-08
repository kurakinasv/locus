import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Title } from 'components/Title';
import { useUIStore } from 'store/RootStore/hooks';

import CloseIcon from 'img/icons/close.svg?react';

import { ModalConfig } from '../config';

import s from './ModalRoot.module.scss';

const ModalRoot: React.FC = () => {
  const { modal } = useUIStore();

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={s['dialog-overlay']} />
      <Dialog.Content
        className={cn(
          s['dialog-content'],
          modal && ModalConfig[modal].confirm ? s['dialog-confirm'] : s['dialog-modal']
        )}
      >
        {!!modal && (
          <>
            <Dialog.Title className={s['dialog-content__title']}>
              <Title>{ModalConfig[modal].title}</Title>
            </Dialog.Title>
            {!ModalConfig[modal].confirm && (
              <Dialog.Close className={s['dialog-modal__close']}>
                <CloseIcon />
              </Dialog.Close>
            )}
            {ModalConfig[modal].component}
          </>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default observer(ModalRoot);
