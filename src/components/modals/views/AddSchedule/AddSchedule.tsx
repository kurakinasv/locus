import * as React from 'react';

import { Button } from 'components/Button';
import { Title } from 'components/Title';

// import s from './AddSchedule.module.scss';

const AddSchedule: React.FC = () => {
  return (
    <>
      <Title>AddSchedule!!</Title>
      <Button closesModal>Cancel</Button>
    </>
  );
};

export default AddSchedule;
