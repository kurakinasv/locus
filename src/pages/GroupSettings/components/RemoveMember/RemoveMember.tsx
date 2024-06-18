import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { Button, Dropdown, Spacing, Title } from 'components';
import { User } from 'entities/user';
import { useGroupStore } from 'store/RootStore/hooks';
import { UUIDString } from 'typings/api';
import { OptionType, SizeEnum } from 'typings/ui';

type Props = {
  userId: User['id'];
  users: User[];
};

const RemoveMember: React.FC<Props> = ({ userId, users }) => {
  const { deleteUserFromGroup, meta } = useGroupStore();

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

  const deleteUser = async () => {
    await deleteUserFromGroup(option);

    if (!meta.editGroup.error) {
      setOption('');
    }
  };

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
      <Button size={SizeEnum.s} onClick={deleteUser} disabled={!option || meta.editGroup.loading}>
        Удалить
      </Button>
    </>
  );
};

export default observer(RemoveMember);
