import { z } from 'zod';

import { patchClient } from '@/api/client/patchClient';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@/types/Clients';
import { areValuesEqual } from '@/utils/comparison';
import { formatStr } from '@/utils/parseTypes';

import { ClientForm, OptionalClientFormSchema } from './ClientForm';

export const EditClientForm = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: Client;
  onClose?: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    nombre_completo: formatStr(data.nombre_completo),
    telefono: formatStr(data.telefono),
    mail: formatStr(data.mail),
    rut: formatStr(data.rut),
  };

  async function handleSubmit(data: z.infer<typeof OptionalClientFormSchema>) {
    if (areValuesEqual(defaultValues, data)) {
      toast({
        title: 'No hay cambios',
        description: 'No se realizaron cambios en el formulario.',
      });
      return;
    }

    const client = data;
    await patchClient(client);

    triggerRefetch();
    toast({ description: 'Cliente actualizado' });
    setTimeout(() => {
      if (onClose) onClose();
    }, 1000);
  }

  return (
    <ClientForm
      handleSubmit={handleSubmit}
      schema={OptionalClientFormSchema}
      defaultValues={defaultValues}
      title="Editar Cliente"
    />
  );
};
