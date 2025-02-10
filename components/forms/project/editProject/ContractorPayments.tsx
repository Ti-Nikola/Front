'use client';

import { useState } from 'react';

import { EditCPForm } from '@/components/forms/contractorPayment/EditCP';
import { EditExtraCPForm } from '@/components/forms/contractorPayment/EditExtraCP';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ContractorPayment } from '@/types/ContractorPayment';
import { EditText } from '@/utils/text';

export const EditProjectContractorPaymentsForm = ({
  data,
  isExtra = false,
  triggerRefetch,
}: {
  data: ContractorPayment;
  isExtra?: boolean;
  triggerRefetch: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const txt = new EditText(`Pago ${isExtra ? 'Extra ' : ''}Contratista`);

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
            <EditExtraCPForm
              data={data}
              onClose={() => setOpen(false)}
              triggerRefetch={triggerRefetch}
            />
          ) : (
            <EditCPForm
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
