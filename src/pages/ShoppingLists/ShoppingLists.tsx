import React, { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { Button } from 'components/Button';
import { ModalEnum } from 'components/modals';
import { Spacing } from 'components/Spacing';
import { Spinner } from 'components/Spinner';
import { Stub } from 'components/Stub';
import { useLocalStore } from 'hooks/useLocalStore';
import ShoppingListStore from 'store/locals/ShoppingListStore';
import { useRootStore, useUIStore } from 'store/RootStore/hooks';

import PlusIcon from 'img/icons/plus.svg?react';

import { Accordion } from './components';

const ShoppingLists: FC = () => {
  const { openModal } = useUIStore();

  const rootStore = useRootStore();

  const store = useLocalStore(() => new ShoppingListStore(rootStore));
  const { meta, lists } = store;

  useEffect(() => {
    store.getShoppingLists();
  }, [store]);

  return (
    <>
      <Button icon={<PlusIcon />} stretched onClick={() => openModal(ModalEnum.shoppingListAdd)}>
        Новый список
      </Button>
      <Spacing size={3} />

      {meta.getLists.loading && <Spinner />}

      {!lists.length && !meta.getLists.loading && <Stub />}

      {!meta.getLists.loading &&
        lists.map((shoppingList, i) => (
          <React.Fragment key={shoppingList.id}>
            <Accordion {...shoppingList} isOpenDefault={i === 0} />
            <Spacing size={1} />
          </React.Fragment>
        ))}
    </>
  );
};

export default observer(ShoppingLists);
