import { z } from 'zod';

import { patchPago } from '@/api/pago/patchPago';
import { useToast } from '@/hooks/use-toast';
import { Pago } from '@/types/Pago';
import { areValuesEqual } from '@/utils/comparison';
import { formatStr, parsePagoToPatch } from '@/utils/parseTypes';

import { EditExtraPagoSchema } from '../Schemas';
import { PagoForm } from './PagoForm';

export const EditPagoExtraForm = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: Pago;
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    monto: formatStr(data.monto),
    numero_pago: formatStr(data.numero_pago),
    estado: data.estado as string,
    mensaje: data.mensaje,
    is_extra: true,
    porcentaje: null,
  };

  async function handleSubmit(data: z.infer<typeof EditExtraPagoSchema>) {
    if (areValuesEqual(defaultValues, data)) {
      toast({
        title: 'No hay cambios',
        description: 'No se realizaron cambios en el formulario.',
      });
      return;
    }

    const pago = parsePagoToPatch(data);
    await patchPago(pago);

    triggerRefetch();

    toast({ description: 'Hito de Pago extra actualizado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <PagoForm
      handleSubmit={handleSubmit}
      schema={EditExtraPagoSchema}
      defaultValues={defaultValues}
      title="Editar Hito de Pago"
    />
  );
};
