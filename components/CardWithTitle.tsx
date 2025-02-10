import React from 'react';

import { cn } from '@/utils/cn';

export default function CardWithTitle({
  title,
  children,
  className,
}: Readonly<{
  title: string;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <>
      <h1
        className={cn(
          'relative top-px z-10 w-fit rounded-t-md border border-b-[#f2f2f2] px-3 py-1 text-sm text-muted-foreground dark:border-b-background',
          className
        )}
      >
        {title}
      </h1>
      <div className="z-10 mb-10 flex flex-wrap space-x-8 space-y-4 rounded-md rounded-ss-none border px-4 pb-8 pt-2">
        {children}
      </div>
    </>
  );
}
