import { z } from 'zod';

import { postContractor } from '@/api/contractor/postContractor';
import { useToast } from '@/hooks/use-toast';

import { ContractorForm, ContractorFormSchema } from './ContractorForm';

export const CreateContractorForm = ({
  onClose,
  triggerRefetch,
}: {
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  async function handleSubmit(data: z.infer<typeof ContractorFormSchema>) {
    const contractor = data;

    await postContractor(contractor);

    triggerRefetch();

    toast({ description: 'Contratista creado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <ContractorForm
      handleSubmit={handleSubmit}
      schema={ContractorFormSchema}
      title="Crear Contratista"
    />
  );
};
