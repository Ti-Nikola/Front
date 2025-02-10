import { ClipboardPenLine, Drill, LandPlot, SendHorizontal, Trash, User } from 'lucide-react';

import { cn } from '@/utils/cn';

export const defaultDockData = [
  {
    title: 'Cliente',
    completed: false,
    active: true,
    icon: <User className={cn('h-full w-full text-neutral-600 dark:text-neutral-300')} />,
  },
  {
    title: 'Equipo',
    completed: false,
    active: false,
    icon: <Drill className={cn('h-full w-full text-neutral-600 dark:text-neutral-300')} />,
  },
  {
    title: 'Planta',
    completed: false,
    active: false,
    icon: <LandPlot className={cn('h-full w-full text-neutral-600 dark:text-neutral-300')} />,
  },
  {
    title: 'Proceso',
    completed: false,
    active: false,
    icon: (
      <ClipboardPenLine className={cn('h-full w-full text-neutral-600 dark:text-neutral-300')} />
    ),
  },
  {
    title: 'Proyecto',
    completed: false,
    active: false,
    icon: <SendHorizontal className={cn('h-full w-full text-neutral-600 dark:text-neutral-300')} />,
  },
  {
    title: 'Borrar',
    completed: false,
    active: false,
    icon: <Trash className={cn('h-full w-full text-red-600 dark:text-red-300')} />,
  },
];
