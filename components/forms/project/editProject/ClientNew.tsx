import { z } from 'zod';

import { postClient } from '@/api/client/postClient';
import { patchProject } from '@/api/project/patchProject';
import { ClientForm, ClientFormSchema } from '@/components/forms/client/ClientForm';
import { ProjectDetail } from '@/types/Project';

export const AssignNewClient = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: ProjectDetail;
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const projectId = data.id;

  async function handleSubmit(data: z.infer<typeof ClientFormSchema>) {
    const newClient = await postClient(data);

    await patchProject({ id: projectId, client: newClient.id });

    triggerRefetch();

    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <ClientForm
      schema={ClientFormSchema}
      handleSubmit={handleSubmit}
      title="Crear y Asignar Cliente"
    />
  );
};
