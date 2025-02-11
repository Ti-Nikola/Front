import { ColumnDef } from '@tanstack/react-table';

import { TableSimple } from '@/components/TableSimple';
import { EditProjectContractorPaymentsForm } from '@/components/forms/project/editProject/ContractorPayments';
import { Button } from '@/components/ui/button';
import { ContractorPayment } from '@/types/ContractorPayment';
import { ProjectDetail } from '@/types/Project';
import { formatCurrency } from '@/utils/currency';

export const PagoContratistaExtraTable = ({
  project,
  triggerRefetch,
  handleDeletePago,
}: {
  project: ProjectDetail;
  triggerRefetch: () => void;
  handleDeletePago: (id: string) => void;
}) => {
  const extras = project.contractor_payments?.filter((p: any) => p.is_extra);

  if (!extras || extras.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold">Extras</h3>
        <div className="flex justify-center text-muted-foreground">No hay pagos extras</div>
      </div>
    );
  }

  const columns: ColumnDef<ContractorPayment>[] = [
    {
      id: 'extra_contractor',
      accessorKey: 'extra_contractor',
      header: 'Contratista',
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'valor_pago',
      accessorKey: 'valor_pago',
      header: 'Monto',
      cell: (info) => {
        return formatCurrency(info.getValue() as number);
      },
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'estado_de_pago',
      accessorKey: 'estado_de_pago',
      header: 'Estado',
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'descripcion',
      accessorKey: 'descripcion',
      header: 'Descripcion',
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="flex justify-center space-x-6">
          <EditProjectContractorPaymentsForm
            data={project.contractor_payments[row.index]}
            triggerRefetch={triggerRefetch}
            isExtra={true}
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
      <div className="relative top-4 flex items-end justify-between">
        <h3 className="text-lg font-semibold">Extras</h3>
      </div>
      <div>
        <TableSimple columns={columns} data={extras} />
      </div>
    </>
  );
};
