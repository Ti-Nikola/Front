import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/utils/cn';

export const CustomTab = ({
  tabs,
  noClass,
}: {
  tabs: { title: string; content: React.ReactNode }[];
  noClass?: boolean;
}) => (
  <Tabs defaultValue={tabs[0]?.title || ''}>
    <TabsList
      className={cn(
        'grid w-full max-w-[1000px] grid-cols-2 justify-self-center',
        noClass && '-mt-4 xl:-mt-8'
      )}
    >
      {tabs.map((tab) => (
        <TabsTrigger key={tab.title} value={tab.title}>
          {tab.title}
        </TabsTrigger>
      ))}
    </TabsList>
    {tabs.map((tab) => (
      <TabsContent key={tab.title} value={tab.title} className="space-y-4">
        <div className={cn(noClass ?? 'mt-4 gap-4 max-xs:space-y-4 xs:grid xs:grid-cols-2')}>
          {tab.content}
        </div>
      </TabsContent>
    ))}
  </Tabs>
);

export const TabItem = ({
  title,
  value,
  icon,
  className,
  small,
}: {
  title: string;
  value: string | number | undefined;
  icon?: React.ReactNode;
  className?: string;
  small?: boolean;
}) => (
  <div className={cn('mb-1', className)}>
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      {icon && React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<any>, { className: 'size-4' })
        : icon}
      <p>{title}</p>
    </div>
    <div className={cn('min-h-7 text-lg font-medium', small && 'text-base text-muted-foreground')}>
      {value}
    </div>
  </div>
);
