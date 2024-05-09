import * as React from 'react';

import { Button } from 'components/Button';
import { useChoresStore } from 'store/RootStore/hooks';

// import s from './AddChore.module.scss';

const AddChore: React.FC = () => {
  const { createChore } = useChoresStore();

  return (
    <>
      <h1>Add Chore</h1>
      <Button onClick={createChore} closesModal>
        Add
      </Button>
      <Button closesModal>Add Chore</Button>
    </>
  );
};

export default AddChore;
