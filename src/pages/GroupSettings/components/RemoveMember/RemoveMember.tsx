import * as React from 'react';

import { Button, Dropdown, Spacing, Title } from 'components';
import { User } from 'entities/user';
import { UUIDString } from 'typings/api';
import { OptionType, SizeEnum } from 'typings/ui';
import { noop } from 'utils/noop';

type Props = {
  userId: User['id'];
  users: User[];
  editGroup: (userId: User['id']) => void;
};

const RemoveMember: React.FC<Props> = ({ userId, users }) => {
  const [option, setOption] = React.useState('');

  const userOptions: OptionType<UUIDString>[] = React.useMemo(
    () =>
      users.reduce((options, { id, name, surname, username }) => {
        if (userId === id) {
          return options;
        }

        let fullName = username;

        if (name || surname) {
          fullName = `${name ?? ''} ${surname ?? ''}`;
        }

        return [
          ...options,
          {
            label: `${fullName}`,
            value: id,
          },
        ];
      }, [] as OptionType<UUIDString>[]),
    [userId, users]
  );

  return (
    <>
      <Title size="h2">Удалить участника</Title>
      <Spacing size={2} />
      <Dropdown
        placeholder="Выберите участника"
        options={userOptions}
        selectedOption={option}
        onChange={setOption}
      />
      <Spacing size={1.2} />
      <Button size={SizeEnum.s} onClick={noop} disabled={!option}>
        Удалить
      </Button>
    </>
  );
};

export default RemoveMember;
