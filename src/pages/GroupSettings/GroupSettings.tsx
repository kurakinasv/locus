import { FC } from 'react';

import { Header, Dropdown, Input, Button, Spacing, Title } from 'components';
import { mockOptions } from 'config/mock/options';
import { noop } from 'utils';

import PlusIcon from 'img/icons/plus.svg?react';

import s from './GroupSettings.module.scss';

const GroupSettings: FC = () => {
  return (
    <div>
      <Spacing size={30} />
      <Header />
      <Spacing size={30} />
      <Dropdown placeholder="Категория" options={mockOptions} />
      <Spacing size={30} />
      <Input placeholder="Пароль" />
      <Spacing size={10} />
      <Input placeholder="Пароль" disabled />
      <Spacing size={30} />
      <Title>предусмотрена поддержка</Title>
      <Title size="h2">предусмотрена поддержка</Title>
      <Spacing size={30} />
      <p>
        В Avenir Next Cyr предусмотрена поддержка кириллицы,{' '}
        <a href="#" className={s.baselink}>
          латиницы
        </a>{' '}
        и греческих символов.
      </p>
      <Spacing size={10} />
      <Button onClick={noop}>click</Button>
      <Spacing size={10} />
      <Button onClick={noop} icon={<PlusIcon />}>
        Кнопка с иконкой
      </Button>
      <Spacing size={10} />
      <Button onClick={noop} disabled>
        click
      </Button>
    </div>
  );
};

export default GroupSettings;
