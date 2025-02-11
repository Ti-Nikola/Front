import {
  Atom,
  BatteryCharging,
  BatteryFull,
  Calendar,
  ClipboardList,
  Columns2,
  Construction,
  File,
  HousePlug,
  Map,
  MapPin,
  Shield,
  TriangleAlert,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';

import { AddNote } from '@/components/forms/project/editProject/AddNote';
import { EditProjectDetailsForm } from '@/components/forms/project/editProject/ProjectDetail';
import { ProjectDetail } from '@/types/Project';
import { formatDateToDisplay } from '@/utils/dates';

import { CustomCard } from './CustomCard';
import { CustomTab, TabItem } from './CustomTab';

export const ProjectDetailCard = ({
  project,
  triggerRefetch,
}: {
  project: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  return (
    <CustomCard
      title="Vista del Proyecto"
      description={project.comentarios}
      editForm={
        <div className="flex items-center gap-2">
          <AddNote
            projectId={project.id}
            comentarios={project.comentarios}
            triggerRefetch={triggerRefetch}
          />
          <EditProjectDetailsForm data={project} triggerRefetch={triggerRefetch} />
        </div>
      }
    >
      <CustomTab
        tabs={[
          {
            title: 'Proyecto',
            content: <ProjectSection project={project} />,
          },
          {
            title: 'Otros',
            content: <OtherSection project={project} />,
          },
        ]}
      />
    </CustomCard>
  );
};

const ProjectSection = ({ project }: { project: ProjectDetail }) => {
  return (
    <>
      <TabItem title="Tipo Instalación" value={project.tipo_instalacion} icon={<Construction />} />
      <TabItem
        title="Nº Cliente"
        value={project.num_cliente_distribuidora}
        icon={<ClipboardList />}
      />

      <TabItem
        title="Potencia Inversor"
        value={project.potencia_kw && `${project.potencia_kw} kW`}
        icon={<Atom />}
      />
      <TabItem
        title="Peak de la Planta"
        value={project.peak_kwp && `${project.peak_kwp} kWp`}
        icon={<Atom />}
      />
      <TabItem
        title="Baterías"
        value={
          project.numero_baterias &&
          project.capacidad_baterias_kwh &&
          `${Number(project.numero_baterias) * Number(project.capacidad_baterias_kwh)} kWh`
        }
        icon={<BatteryFull />}
      />
      <TabItem
        title="Sistema de Respaldo"
        value={project.sistema_respaldo}
        icon={<BatteryCharging />}
      />

      <TabItem title="Dirección" value={project.direccion} icon={<MapPin />} />
      <TabItem title="Comuna" value={project.comuna_name} icon={<Map />} />

      <TabItem title="Ingeniero" value={project.ingeniero_name} icon={<Users />} />
      <TabItem title="Vendedor" value={project.vendedor_name} icon={<Users />} />
      <TabItem title="Contratista" value={project.contratista_name} icon={<Users />} />

      <TabItem
        title="Fecha Firma de Contrato"
        value={formatDateToDisplay(project.fecha_firma_contrato)}
        icon={<Calendar />}
      />
      <TabItem
        title="Inicio de Obras"
        value={formatDateToDisplay(project.fecha_inicio_obra)}
        icon={<Calendar />}
      />
      <TabItem
        title="Término de Obras"
        value={formatDateToDisplay(project.fecha_termino_obra)}
        icon={<Calendar />}
      />
    </>
  );
};

const OtherSection = ({ project }: { project: ProjectDetail }) => {
  return (
    <>
      <TabItem title="Nº Medidor" value={project.numero_medidor} icon={<File />} />
      <TabItem title="Opción Tarifa" value={project.opcion_tarifa} icon={<Wallet />} />

      <TabItem title="Tipo de Empalme" value={project.tipo_empalme} icon={<HousePlug />} />
      <TabItem title="Cargador Eléctrico" value={project.cargador_electrico} icon={<HousePlug />} />
      <TabItem title="Nº Baterías" value={project.numero_baterias} icon={<BatteryFull />} />
      <TabItem title="Nº Paneles" value={project.numero_paneles} icon={<Columns2 />} />
      <TabItem title="Potencia Panel" value={`${project.potencia_panel_Wp} Wp`} icon={<Zap />} />
      <TabItem
        title="Capacidad Baterías"
        value={`${project.capacidad_baterias_kwh} kWh`}
        icon={<BatteryCharging />}
      />
      <TabItem
        title="Potencia Conectada Casa"
        value={`${project.potencia_conectada_casa_kw} kW`}
        icon={<HousePlug />}
      />

      <TabItem title="Diferencial" value={`${project.diferencial_mA} mA`} icon={<Zap />} />
      <TabItem
        title="Protección Empalme"
        value={`${project.proteccion_empalme_A} A`}
        icon={<Shield />}
      />
      <TabItem
        title="¿Caídas Diferencial?"
        value={project.diferencial_presenta_caidas ? 'SI' : 'NO'}
        icon={<TriangleAlert />}
      />
    </>
  );
};
