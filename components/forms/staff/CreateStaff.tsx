import { z } from 'zod';

import { postStaff } from '@/api/staff/postStaff';
import { AreaType, RolType } from '@/const/formChoices';
import { useToast } from '@/hooks/use-toast';

import { StaffForm, StaffFormSchema } from './StaffForm';

export const CreateStaffForm = ({
  onClose,
  triggerRefetch,
}: {
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  async function handleSubmit(data: z.infer<typeof StaffFormSchema>) {
    const staff = { ...data, rol: data.rol as RolType, area: data.area as AreaType };

    await postStaff(staff);

    triggerRefetch();

    toast({ description: 'Staff creado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return <StaffForm handleSubmit={handleSubmit} schema={StaffFormSchema} title="Crear Staff" />;
};
