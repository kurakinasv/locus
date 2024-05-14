import React, { FC } from 'react';

import { Button } from 'components/Button';
import { ModalEnum } from 'components/modals';
import { Spacing } from 'components/Spacing';
import { MOCK_SHOPPING_LISTS } from 'entities/mock/shoppingList';
import { useUIStore } from 'store/RootStore/hooks';

import PlusIcon from 'img/icons/plus.svg?react';

import { Accordion } from './components';

const ShoppingLists: FC = () => {
  const { openModal } = useUIStore();

  return (
    <>
      <Button icon={<PlusIcon />} stretched onClick={() => openModal(ModalEnum.shoppingListAdd)}>
        Новый список
      </Button>
      <Spacing size={3} />
      {MOCK_SHOPPING_LISTS.map((shoppingList, i) => (
        <React.Fragment key={shoppingList.id}>
          <Accordion {...shoppingList} isOpenDefault={i === 0} />
          <Spacing size={1} />
        </React.Fragment>
      ))}
    </>
  );
};

export default ShoppingLists;
