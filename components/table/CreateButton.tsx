import { Plus } from 'lucide-react';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const CreateNewInstance = ({
  instance,
  children,
  isDialogOpen,
  setIsDialogOpen,
}: {
  instance: string;
  children: ReactNode;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
}) => {
  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="size-6" />
        Crear
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[calc(90vh)] max-w-[400px] overflow-scroll md:max-w-[600px] lg:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Crear {instance}</DialogTitle>
            <DialogDescription className="pb-4">
              Completa los campos y crea un nuevo {instance.toLowerCase()}.
            </DialogDescription>
            {children}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
