import { ColumnDef } from '@tanstack/react-table';

import { TableSimple } from '@/components/TableSimple';
import { EditProjectPaymentsForm } from '@/components/forms/project/editProject/Payments';
import { Button } from '@/components/ui/button';
import { Pago } from '@/types/Pago';
import { ProjectDetail } from '@/types/Project';
import { formatCurrency } from '@/utils/currency';

export const PagoExtraTable = ({
  project,
  triggerRefetch,
  handleDeletePago,
}: {
  project: ProjectDetail;
  triggerRefetch: () => void;
  handleDeletePago: (id: string) => void;
}) => {
  const extra = project.payments?.filter((p) => p.is_extra);

  if (!extra || extra.length === 0) {
    return (
      <>
        <h3 className="text-lg font-semibold">Extras</h3>
        <div className="flex justify-center text-muted-foreground">No hay pagos extras</div>
      </>
    );
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
        <div className="flex justify-center space-x-6">
          <EditProjectPaymentsForm
            data={project.payments[row.index]}
            triggerRefetch={triggerRefetch}
            isExtra
          />
          <Button
            onClick={() => handleDeletePago(row.original.id.toString())}
            variant="secondary"
            className="justify-end"
          >
            Eliminar
          </Button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return (
    <>
      <h3 className="relative top-2 text-lg font-semibold">Extras</h3>
      <TableSimple columns={columns} data={extra} />
    </>
  );
};
