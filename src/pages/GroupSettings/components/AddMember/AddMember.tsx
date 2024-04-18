import * as React from 'react';

import { Button, Spacing, Text, Title } from 'components';
import { SizeEnum } from 'typings/ui';
import { noop } from 'utils/noop';

const AddMember: React.FC = () => {
  return (
    <>
      <Title size="h2">Добавить участника</Title>
      <Spacing size={2} />
      <Text color="gray">Пригласите нового участника, отправив ему ссылку-приглашение</Text>
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={noop}>
        Скопировать
      </Button>
      <Spacing size={2.2} />
      <Text color="gray">Пригласите нового участника, отправив ему код-приглашение</Text>
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={noop}>
        Сгенерировать код
      </Button>
    </>
  );
};

export default AddMember;
