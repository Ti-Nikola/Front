import { z } from 'zod';

import { patchStaff } from '@/api/staff/patchStaff';
import { useToast } from '@/hooks/use-toast';
import { Staff } from '@/types/Staff';
import { areValuesEqual } from '@/utils/comparison';
import { parseStaffToPatch } from '@/utils/parseTypes';

import { OptionalStaffFormSchema, StaffForm } from './StaffForm';

export const EditStaffForm = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: Staff;
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    nombre_completo: data.nombre_completo,
    telefono: data.telefono,
    mail: data.mail,
    rut: data.rut,
    area: data.area,
    rol: data.rol,
  };

  async function handleSubmit(data: z.infer<typeof OptionalStaffFormSchema>) {
    if (areValuesEqual(defaultValues, data)) {
      toast({ title: 'No hay cambios', description: 'No se realizaron cambios en el formulario.' });
      return;
    }
    const staff = parseStaffToPatch(data);

    await patchStaff(staff);

    triggerRefetch();

    toast({ description: 'Contratista actualizado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <StaffForm
      handleSubmit={handleSubmit}
      schema={OptionalStaffFormSchema}
      defaultValues={defaultValues}
      title="Editar Contratista"
    />
  );
};
