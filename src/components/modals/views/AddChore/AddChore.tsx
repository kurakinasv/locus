import * as React from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { Button } from 'components/Button';
import { useUIStore } from 'store/RootStore/hooks';

// import s from './AddChore.module.scss';

const AddChore: React.FC = () => {
  const { closeModal } = useUIStore();

  return (
    <>
      <h1>Add Chore</h1>
      <Dialog.Close asChild>
        <Button onClick={closeModal}>Add Chore</Button>
      </Dialog.Close>
    </>
  );
};

export default AddChore;
