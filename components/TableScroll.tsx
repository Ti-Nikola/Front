'use client';

import { Cell, Table } from '@tanstack/react-table';
import { useEffect } from 'react';

import { Table as BaseTable } from '@/components/ui/table';
import useDebounce from '@/hooks/useDebounce';
import { cn } from '@/utils/cn';

import { TableBody } from './table/TableBody';
import { TableHeaders } from './table/TableHeaders';

interface ITableProps<TData> {
  table: Table<TData>;
  isLoading: boolean;
  searchValue?: string;
  tableClassName?: string;
  handleCellClick?: (cell: Cell<any, unknown>) => void;
}

export function TableScroll<TData>({
  table,
  isLoading,
  searchValue,
  tableClassName,
  handleCellClick,
}: ITableProps<TData>) {
  const searchDebouncedValue = useDebounce(searchValue);

  useEffect(() => {
    if (table.getColumn('metadata')?.getIsVisible())
      table.getColumn('metadata')?.toggleVisibility(false);
  }, [table]);

  useEffect(() => {
    table.setGlobalFilter(searchDebouncedValue);
  }, [table, searchDebouncedValue]);

  return (
    <div
      className={cn(
        'h-[calc(90vh-200px)] min-h-96 overflow-auto rounded-md border',
        tableClassName
      )}
    >
      <BaseTable className="relative w-full">
        <TableHeaders table={table} className="sticky top-0" />
        <TableBody
          isLoading={isLoading}
          table={table}
          handleCellClick={handleCellClick || (() => {})}
          className="w-full"
        />
      </BaseTable>
    </div>
  );
}
