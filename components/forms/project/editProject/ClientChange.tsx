import { patchProject } from '@/api/project/patchProject';
import { SelectClientForm, SelectClientSchema } from '@/components/forms/client/SelectClient';
import { useToast } from '@/hooks/use-toast';
import { ProjectDetail } from '@/types/Project';
import { areValuesEqual } from '@/utils/comparison';

export const ChangeClientForm = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: ProjectDetail;
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    client: data.client.id,
  };

  async function handleSubmit(data: SelectClientSchema) {
    if (areValuesEqual(defaultValues, data)) {
      toast({
        title: 'No hay cambios',
        description: 'No se realizaron cambios en el formulario.',
      });
      return;
    }

    await patchProject(data);

    triggerRefetch();

    toast({ description: 'Cliente Cambiado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return <SelectClientForm handleSubmit={handleSubmit} defaultValues={defaultValues} />;
};
