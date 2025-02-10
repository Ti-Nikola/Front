import { z } from 'zod';

import { postClient } from '@/api/client/postClient';
import { useToast } from '@/hooks/use-toast';

import { ClientForm, ClientFormSchema } from './ClientForm';

export const CreateClientForm = ({
  onClose,
  triggerRefetch,
}: {
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  async function handleSubmit(data: z.infer<typeof ClientFormSchema>) {
    const client = data;
    await postClient(client);
    triggerRefetch();
    toast({ description: 'Cliente creado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return <ClientForm handleSubmit={handleSubmit} schema={ClientFormSchema} title="Crear Cliente" />;
};
