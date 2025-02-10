import { DockData } from '@/app/projects/new/page';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/motion/dock';
import { cn } from '@/utils/cn';

export function DockComponent({
  data,
  handleClick,
}: {
  data: DockData[];
  handleClick: (idx: number) => void;
}) {
  const activeIndex = data.findIndex((item) => item.active);
  const completedIndexes = data.reduce(
    (acc, item, idx) => {
      if (item.completed) {
        acc[idx] = true;
      }
      return acc;
    },
    {} as Record<number, boolean>
  );

  return (
    <div className="absolute bottom-4 left-1/2 max-w-full -translate-x-1/2">
      <Dock className="items-end pb-3">
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            onClick={() => handleClick(idx)}
            className={cn(
              'aspect-square rounded-full border bg-background dark:bg-neutral-800',
              activeIndex === idx && 'border-2 border-sky-500',
              idx in completedIndexes && 'border-2 border-green-500'
            )}
          >
            <DockLabel>{item.title}</DockLabel>
            <DockIcon>{item.icon}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
