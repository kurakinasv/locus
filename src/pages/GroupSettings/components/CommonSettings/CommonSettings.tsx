import * as React from 'react';

import { observer } from 'mobx-react-lite';

import { Button, Input, Spacing, Title } from 'components';
import { PhotoUpload } from 'components/PhotoUpload';
import ImageStub from 'img/groupSettings/image-stub.png';
import { useGroupStore } from 'store/RootStore/hooks';
import { SizeEnum } from 'typings/ui';
import { sleep } from 'utils/sleep';

const CommonSettings: React.FC = () => {
  const { editGroup, group } = useGroupStore();

  const [name, setName] = React.useState(group?.name ?? '');
  const [_, setPhoto] = React.useState<File | null>(null);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onSaveClick = () => {
    editGroup({ name: name.trim() });
  };

  const onUploadPhoto = async (photo: File) => {
    setPhoto(photo);
    await sleep(1);
    await editGroup({ image: photo });
  };

  if (!group) {
    return null;
  }

  return (
    <>
      <Title size="h2">Общие</Title>
      <Spacing size={2} />
      <PhotoUpload image={group?.image ?? ImageStub} setValue={onUploadPhoto} />
      <Spacing size={3.3} />
      <Input placeholder="Название группы" value={name} onChange={onNameChange} />
      <Spacing size={1.2} />
      <Button
        size={SizeEnum.s}
        onClick={onSaveClick}
        disabled={!name.trim() || name.trim() === group.name}
      >
        Сохранить
      </Button>
    </>
  );
};

export default observer(CommonSettings);
