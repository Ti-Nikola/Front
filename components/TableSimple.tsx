import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table as BaseTable } from '@/components/ui/table';

import { TableBody } from './table/TableBody';
import { TableHeaders } from './table/TableHeaders';

interface ITableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
}

export function TableSimple<TData, TValue>({
  data,
  columns,
  isLoading = false,
}: ITableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <BaseTable className="relative w-full overflow-x-scroll">
      <TableHeaders table={table} className="bg-shade text-primary" />
      <TableBody isLoading={isLoading} table={table} rowClassName="hover:bg-border" />
    </BaseTable>
  );
}
