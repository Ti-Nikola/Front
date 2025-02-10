import { z } from 'zod';

import { patchContractorPayment } from '@/api/contractorPayment/patchContractorPayment';
import { useToast } from '@/hooks/use-toast';
import { ContractorPayment } from '@/types/ContractorPayment';
import { areValuesEqual } from '@/utils/comparison';
import { formatStr, parseContractorPaymentToPatch } from '@/utils/parseTypes';

import { EditExtraCPSchema } from '../Schemas';
import { CPForm } from './CPForm';

export const EditExtraCPForm = ({
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
    extra_contractor: data.extra_contractor,
    is_extra: true,
  };

  async function handleSubmit(data: z.infer<typeof EditExtraCPSchema>) {
    if (areValuesEqual(defaultValues, data)) {
      toast({
        title: 'No hay cambios',
        description: 'No se realizaron cambios en el formulario.',
      });
      return;
    }

    const extraContractorPayment = parseContractorPaymentToPatch(data, true);
    await patchContractorPayment(extraContractorPayment);

    triggerRefetch();

    toast({ description: 'Pago extra a contratista actualizado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <CPForm
      handleSubmit={handleSubmit}
      schema={EditExtraCPSchema}
      defaultValues={defaultValues}
      title="Editar Pago Extra a Contratista"
    />
  );
};
