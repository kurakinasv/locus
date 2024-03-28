import * as React from 'react';

import { Button } from 'components';
import { useUserStore } from 'store/RootStore/hooks';

// import s from './EnterGroup.module.scss';

const EnterGroup: React.FC = () => {
  const { enterGroup } = useUserStore();

  return (
    <div style={{ fontSize: '10rem' }}>
      EnterGroup
      <div>
        <Button onClick={enterGroup}>TO GROUP</Button>
      </div>
    </div>
  );
};

export default EnterGroup;
