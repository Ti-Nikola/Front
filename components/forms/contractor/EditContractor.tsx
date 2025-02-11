import { z } from 'zod';

import { patchContractor } from '@/api/contractor/patchContractor';
import { useToast } from '@/hooks/use-toast';
import { Contractor } from '@/types/Contractor';
import { areValuesEqual } from '@/utils/comparison';

import { ContractorForm, OptionalContractorFormSchema } from './ContractorForm';

export const EditContractorForm = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: Contractor;
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    nombre: data.nombre,
    telefono: data.telefono,
    mail: data.mail,
    rut: data.rut,
    rut_empresa: data.rut_empresa,
    nombre_empresa: data.nombre_empresa,
    representante_empresa: data.representante_empresa,
    porcentaje_de_pago_1: data.porcentaje_de_pago_1,
    porcentaje_de_pago_2: data.porcentaje_de_pago_2,
    porcentaje_de_pago_3: data.porcentaje_de_pago_3,
  };

  async function handleSubmit(data: z.infer<typeof OptionalContractorFormSchema>) {
    if (areValuesEqual(defaultValues, data)) {
      toast({
        title: 'No hay cambios',
        description: 'No se realizaron cambios en el formulario.',
      });
      return;
    }
    const contractor = data;

    await patchContractor(contractor);

    triggerRefetch();

    toast({ description: 'Contratista actualizado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <ContractorForm
      handleSubmit={handleSubmit}
      schema={OptionalContractorFormSchema}
      defaultValues={defaultValues}
      title="Editar Contratista"
    />
  );
};
