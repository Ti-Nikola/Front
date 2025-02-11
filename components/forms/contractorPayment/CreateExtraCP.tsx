import { z } from 'zod';

import { postContractorPayment } from '@/api/contractorPayment/postContractorPayment';
import { useToast } from '@/hooks/use-toast';
import { parseContractorPaymentToPatch } from '@/utils/parseTypes';

import { CreateExtraCPSchema } from '../Schemas';
import { CPForm } from './CPForm';

export const CreateExtraCPForm = ({
  onClose,
  triggerRefetch,
}: {
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  async function handleSubmit(data: z.infer<typeof CreateExtraCPSchema>) {
    const contractorPayment = parseContractorPaymentToPatch(data, true);

    await postContractorPayment(contractorPayment);

    triggerRefetch();

    toast({ description: 'Pago a extra contratista creado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <CPForm
      handleSubmit={handleSubmit}
      schema={CreateExtraCPSchema}
      title="Crear Pago Extra a Contratista"
    />
  );
};
