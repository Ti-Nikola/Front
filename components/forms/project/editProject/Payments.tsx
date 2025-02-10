'use client';

import { useState } from 'react';

import { EditPagoForm } from '@/components/forms/pago/EditPago';
import { EditPagoExtraForm } from '@/components/forms/pago/EditPagoExtra';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pago } from '@/types/Pago';
import { EditText } from '@/utils/text';

export const EditProjectPaymentsForm = ({
  data,
  isExtra = false,
  triggerRefetch,
}: {
  data: Pago;
  isExtra?: boolean;
  triggerRefetch: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const txt = new EditText(`Hito de Pago ${isExtra ? 'Extra' : ''}`);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Editar</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(90vh)] max-w-[400px] overflow-scroll lg:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{txt.title}</DialogTitle>
          <DialogDescription>{txt.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isExtra ? (
            <EditPagoExtraForm
              data={data}
              onClose={() => setOpen(false)}
              triggerRefetch={triggerRefetch}
            />
          ) : (
            <EditPagoForm
              data={data}
              onClose={() => setOpen(false)}
              triggerRefetch={triggerRefetch}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
