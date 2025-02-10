import { EditProjectClientForm } from '@/components/forms/project/editProject/Client';
import { ProjectDetail } from '@/types/Project';
import { formatPhoneNumber } from '@/utils/phone';

import { CustomCard } from './CustomCard';
import { TabItem } from './CustomTab';

export const ClientCard = ({
  project,
  triggerRefetch,
}: {
  project: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  const client = project.client;

  return (
    <CustomCard
      title="Cliente"
      editForm={<EditProjectClientForm data={project} triggerRefetch={triggerRefetch} />}
    >
      {!client ? (
        <p className="text-muted-foreground">No hay cliente asignado</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 lg:pb-5">
          <TabItem title="Nombre del Cliente" value={client.nombre_completo} />
          <TabItem title="Rut" value={client.rut} />
          <TabItem title="Teléfono" value={formatPhoneNumber(client.telefono)} />
          <TabItem title="Email" value={client.mail} />
        </div>
      )}
    </CustomCard>
  );
};
