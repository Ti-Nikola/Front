import { JSX } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';

export const CustomCard = ({
  title,
  description,
  editForm,
  children,
  className,
}: {
  title: string;
  description?: string;
  editForm?: JSX.Element;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card className={cn('relative overflow-hidden', className)}>
    <CardHeader>
      <div className="flex justify-between gap-4">
        <div className="-mb-2 flex-1">
          <CardTitle>{title}</CardTitle>
          {description?.split('\n').map((line, index) => (
            <CardDescription key={index} className="mt-1">
              {line}
            </CardDescription>
          ))}
        </div>
        {editForm && <div className="flex justify-end">{editForm}</div>}
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
