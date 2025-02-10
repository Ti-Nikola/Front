import { ColumnDef } from '@tanstack/react-table';

import { EditProjectPaymentsForm } from '@/components/forms/project/editProject/Payments';
import { TableSimple } from '@/components/TableSimple';
import { Pago } from '@/types/Pago';
import { ProjectDetail } from '@/types/Project';
import { formatCurrency } from '@/utils/currency';

export const PagoTable = ({
  project,
  triggerRefetch,
}: {
  project: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  const pago = project.payments?.filter((p) => !p.is_extra);

  if (!pago || pago.length === 0) {
    return <div className="flex justify-center text-muted-foreground">No hay pagos</div>;
  }

  const columns: ColumnDef<Pago>[] = [
    {
      id: 'numero_pago',
      accessorKey: 'numero_pago',
      header: 'Hito',
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'monto',
      accessorKey: 'monto',
      header: 'Monto',
      cell: (info) => {
        return formatCurrency(info.getValue() as number);
      },
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'porcentaje',
      accessorKey: 'porcentaje',
      header: 'Porcentaje',
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'estado',
      accessorKey: 'estado',
      header: 'Estado',
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'mensaje',
      accessorKey: 'mensaje',
      header: 'Descripcion',
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <EditProjectPaymentsForm
          data={project.payments[row.index]}
          triggerRefetch={triggerRefetch}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return <TableSimple columns={columns} data={pago} />;
};
