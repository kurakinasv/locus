import { FC, ReactNode, memo } from 'react';
import * as TabsR from '@radix-ui/react-tabs';

import { OptionType } from 'typings/ui';

import s from './Tabs.module.scss';

type TabsProps = {
  tabOptions: OptionType<string>[];
  tabsContent: Array<{ value: string; content: ReactNode }>;
};

const Tabs: FC<TabsProps> = ({ tabOptions, tabsContent }) => {
  return (
    <TabsR.Root className={s.root} defaultValue={tabOptions[0].value}>
      <TabsR.List className={s.tabs}>
        {tabOptions.map(({ label, value }) => (
          <TabsR.Trigger className={s.tab} value={value}>
            {label}
          </TabsR.Trigger>
        ))}
      </TabsR.List>
      {tabsContent.map(({ value, content }) => (
        <TabsR.Content className={s.content} value={value}>
          {content}
        </TabsR.Content>
      ))}
    </TabsR.Root>
  );
};

export default memo(Tabs);
