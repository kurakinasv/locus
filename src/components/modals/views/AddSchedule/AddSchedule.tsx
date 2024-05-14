import * as React from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { useUIStore } from 'store/RootStore/hooks';

// import s from './AddSchedule.module.scss';

const AddSchedule: React.FC = () => {
  const { closeModal } = useUIStore();

  return (
    <>
      <Title>AddSchedule!!</Title>
      <Dialog.Close asChild>
        <Button onClick={closeModal}>Cancel</Button>
      </Dialog.Close>
    </>
  );
};

export default AddSchedule;
