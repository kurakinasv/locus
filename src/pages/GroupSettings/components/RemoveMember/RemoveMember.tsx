import * as React from 'react';

import { Button, Dropdown, Spacing, Title } from 'components';
import { mockOptions } from 'config/mock/options';
import { SizeEnum } from 'typings/ui';
import { noop } from 'utils/noop';

const RemoveMember: React.FC = () => {
  return (
    <>
      <Title size="h2">Удалить участника</Title>
      <Spacing size={2} />
      <Dropdown placeholder="Выберите участника" options={mockOptions} />
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={noop}>
        Удалить
      </Button>
    </>
  );
};

export default RemoveMember;
