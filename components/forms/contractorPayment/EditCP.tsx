import { z } from 'zod';

import { patchContractorPayment } from '@/api/contractorPayment/patchContractorPayment';
import { EditCPSchema } from '@/components/forms/Schemas';
import { useToast } from '@/hooks/use-toast';
import { ContractorPayment } from '@/types/ContractorPayment';
import { areValuesEqual } from '@/utils/comparison';
import { formatStr, parseContractorPaymentToPatch } from '@/utils/parseTypes';

import { CPForm } from './CPForm';

export const EditCPForm = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: ContractorPayment;
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    valor_pago: formatStr(data.valor_pago),
    tipo_pago: data.tipo_pago as string,
    descripcion: data.descripcion,
    estado_de_pago: data.estado_de_pago as string,
    is_extra: false,
  };

  async function handleSubmit(data: z.infer<typeof EditCPSchema>) {
    if (areValuesEqual(defaultValues, data)) {
      toast({
        title: 'No hay cambios',
        description: 'No se realizaron cambios en el formulario.',
      });
      return;
    }

    const contractorPayment = parseContractorPaymentToPatch(data);
    await patchContractorPayment(contractorPayment);

    triggerRefetch();

    toast({ description: 'Pago a contratista actualizado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <CPForm
      handleSubmit={handleSubmit}
      schema={EditCPSchema}
      defaultValues={defaultValues}
      title="Editar Pago a Contratista"
    />
  );
};
