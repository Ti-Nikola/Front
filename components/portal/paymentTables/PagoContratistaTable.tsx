import { ColumnDef } from '@tanstack/react-table';

import { EditProjectContractorPaymentsForm } from '@/components/forms/project/editProject/ContractorPayments';
import { TableSimple } from '@/components/TableSimple';
import { ContractorPayment } from '@/types/ContractorPayment';
import { ProjectDetail } from '@/types/Project';
import { formatCurrency } from '@/utils/currency';

export const PagoContratistaTable = ({
  project,
  triggerRefetch,
}: {
  project: ProjectDetail;
  triggerRefetch: () => void;
}) => {
  const contractorPayments = project.contractor_payments?.filter((p: any) => !p.is_extra);

  if (!contractorPayments || contractorPayments.length === 0) {
    return <div className="flex justify-center text-muted-foreground">No hay pagos</div>;
  }

  const columns: ColumnDef<ContractorPayment>[] = [
    {
      id: 'tipo_pago',
      accessorKey: 'tipo_pago',
      header: 'Tipo ',
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
        <EditProjectContractorPaymentsForm
          data={project.contractor_payments[row.index]}
          triggerRefetch={triggerRefetch}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return <TableSimple columns={columns} data={contractorPayments} />;
};
