import { FC } from 'react';

import { Header, Dropdown, Input, Button, Logo, Spacing, Title } from 'components';
import { mockOptions } from 'config/mock/options';
import { noop } from 'utils';

// import s from './GroupSettings.module.scss';

const GroupSettings: FC = () => {
  return (
    <div>
      <div>GroupSettings</div>
      <Header />
      <Header title="предусмотрена поддержка" />
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
      <Button onClick={noop}>click</Button>
      <Spacing size={10} />
      <Button onClick={noop} icon={<Logo />}>
        click
      </Button>
      <Spacing size={10} />
      <Button onClick={noop} disabled>
        click
      </Button>
      <Spacing size={10} />
      <p>В Avenir Next Cyr предусмотрена поддержка кириллицы, латиницы и греческих символов.</p>
    </div>
  );
};

export default GroupSettings;
