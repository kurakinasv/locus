import { FC, ReactNode, memo } from 'react';

import * as TabsR from '@radix-ui/react-tabs';

import { Spinner } from 'components/Spinner';
import { OptionType } from 'typings/ui';

import s from './Tabs.module.scss';

type TabsProps = {
  tabOptions: OptionType<string>[];
  tabsContent: Array<{ value: string; content: ReactNode }>;
  loading?: boolean;
};

const Tabs: FC<TabsProps> = ({ tabOptions, tabsContent, loading = false }) => {
  return (
    <TabsR.Root className={s.root} defaultValue={tabOptions[0].value}>
      <TabsR.List className={s.tabs}>
        {tabOptions.map(({ label, value }) => (
          <TabsR.Trigger key={value} className={s.tab} value={value} disabled={loading}>
            {label}
          </TabsR.Trigger>
        ))}
      </TabsR.List>
      {tabsContent.map(({ value, content }) => (
        <TabsR.Content key={value} className={s.content} value={value}>
          {loading ? <Spinner /> : content}
        </TabsR.Content>
      ))}
    </TabsR.Root>
  );
};

export default memo(Tabs);
