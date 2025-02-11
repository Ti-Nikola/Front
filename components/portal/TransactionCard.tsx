import { Building2, Calendar, CreditCard, File, Landmark } from 'lucide-react';

import { EditFacturacionForm } from '@/components/forms/project/editProject/Facturacion';
import { ProjectDetail } from '@/types/Project';
import { formatDateToDisplay } from '@/utils/dates';
import { formatNumberToDisplay } from '@/utils/numbers';

import { CustomCard } from './CustomCard';
import { CustomTab, TabItem } from './CustomTab';

export const TransactionCard = ({
  project,
  triggerRefetch,
}: {
  project: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  return (
    <CustomCard
      title="Tramitación"
      editForm={<EditFacturacionForm data={project} triggerRefetch={triggerRefetch} />}
    >
      <CustomTab
        tabs={[
          {
            title: 'Tramitación',
            content: (
              <>
                <TabItem title="Distribuidora" value={project.distribuidora} icon={<Building2 />} />
                <TabItem
                  title="N° Proceso SEC"
                  value={formatNumberToDisplay(project.numero_proceso_sec)}
                  icon={<File />}
                />
                <TabItem
                  title="N° Solicitud F3"
                  value={formatNumberToDisplay(project.numero_solicitud_f3)}
                  icon={<File />}
                />
                <TabItem
                  title="N° Solicitud F5"
                  value={formatNumberToDisplay(project.numero_solicitud_f5)}
                  icon={<File />}
                />
                <TabItem
                  title="Folio Inscripción TE4"
                  value={formatNumberToDisplay(project.folio_inscripcion_te4)}
                  icon={<File />}
                />
                <TabItem
                  title="Código Verificación TE4"
                  value={formatNumberToDisplay(project.codigo_verif_te4)}
                  icon={<File />}
                />
                <TabItem
                  title="Fecha Ingreso F3"
                  value={formatDateToDisplay(project.fecha_ingreso_f3)}
                  icon={<Calendar />}
                />
                <TabItem
                  title="Fecha Aprobación F3"
                  value={formatDateToDisplay(project.fecha_aprobacion_f3)}
                  icon={<Calendar />}
                />
                <TabItem
                  title="Fecha Ingreso TE4"
                  value={formatDateToDisplay(project.fecha_ingreso_te4)}
                  icon={<Calendar />}
                />
                <TabItem
                  title="Fecha Aprobación TE4"
                  value={formatDateToDisplay(project.fecha_aprobacion_te4)}
                  icon={<Calendar />}
                />
                <TabItem
                  title="Fecha Ingreso F5"
                  value={formatDateToDisplay(project.fecha_ingreso_f5)}
                  icon={<Calendar />}
                />
                <TabItem
                  title="Fecha Aprobación F5"
                  value={formatDateToDisplay(project.fecha_aprobacion_f5)}
                  icon={<Calendar />}
                />
                <TabItem
                  title="Fecha Ingreso TE6"
                  value={formatDateToDisplay(project.fecha_ingreso_te6)}
                  icon={<Calendar />}
                />
                <TabItem
                  title="Fecha Aprobación TE6"
                  value={formatDateToDisplay(project.fecha_aprobacion_te6)}
                  icon={<Calendar />}
                />
                <TabItem
                  title="Manifestación de Conformidad"
                  value={project.manifestacion_conformidad ? 'SI' : 'NO'}
                  icon={<File />}
                />
              </>
            ),
          },
          {
            title: 'Facturación',
            content: (
              <>
                <TabItem title="Centro Costo" value={project.centro_costo} icon={<CreditCard />} />
                <TabItem
                  title="RUT Facturación"
                  value={project.rut_facturacion}
                  icon={<CreditCard />}
                />
                <TabItem title="Razón Social" value={project.razon_social} icon={<CreditCard />} />
                <TabItem title="Banco" value={project.banco} icon={<Landmark />} />
                <TabItem
                  title="Financiamiento"
                  value={project.financiamiento}
                  icon={<Landmark />}
                />
                <TabItem
                  title="Facturación Naturaleza"
                  value={project.facturacion_naturaleza}
                  icon={<CreditCard />}
                />
              </>
            ),
          },
        ]}
      />
    </CustomCard>
  );
};
