import * as React from 'react';

import { Button } from 'components';
import { useUserStore } from 'store/RootStore/hooks';

// import s from './CreateGroup.module.scss';

const CreateGroup: React.FC = () => {
  const { enterGroup } = useUserStore();

  return (
    <div style={{ fontSize: '10rem' }}>
      createGroup
      <div>
        <Button onClick={enterGroup}>TO GROUP</Button>
      </div>
    </div>
  );
};

export default CreateGroup;
