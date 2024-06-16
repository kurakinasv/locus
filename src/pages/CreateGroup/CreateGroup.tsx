import * as React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Button, GoBackButton, Input, Spacing, Title } from 'components';
import { routes } from 'config/routes';
import { useGroupStore } from 'store/RootStore/hooks';

import s from './CreateGroup.module.scss';

const CreateGroup: React.FC = () => {
  const location = useLocation();
  const nav = useNavigate();

  const { meta, createGroup } = useGroupStore();

  const [value, setValue] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const onCreateGroup = async () => {
    await createGroup(value);

    if (location.pathname === routes.createAnotherGroup.full) {
      nav(routes.group.full);
    }
  };

  return (
    <div className={s.wrapper}>
      <Title size="h1">Создать группу</Title>
      <Spacing size={4} />
      <Input
        placeholder="Название"
        value={value}
        onChange={onChange}
        disabled={meta.createGroup.loading}
      />
      <Spacing size={5.2} />
      <div className={s.buttons}>
        <GoBackButton disabled={meta.createGroup.loading} />
        <Spacing size={1} horizontal />
        <Button onClick={onCreateGroup} disabled={!value || meta.createGroup.loading}>
          Создать
        </Button>
      </div>
    </div>
  );
};

export default CreateGroup;
