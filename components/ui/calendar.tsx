'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import cln from 'react-day-picker/style.module.css';

import { cn } from '@/utils/cn';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames = cln,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={classNames}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
