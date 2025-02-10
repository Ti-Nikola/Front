import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  ColumnSort,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Table as BaseTable } from '@/components/ui/table';
import { cn } from '@/utils/cn';

import { ColumnSelector } from './table/ColumnSelector';
import { Pagination } from './table/Pagination';
import { SearchBar } from './table/SearchBar';
import { TableBody } from './table/TableBody';
import { TableHeaders } from './table/TableHeaders';

interface ITableProps<TData, TValue> {
  isLoading: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowsCount: number;
  rowsPerPage?: number;
  searchValue?: string;
  filters?: any[];
  handlePageChange: (page: number) => void;
  setOrderBy?: Dispatch<SetStateAction<ColumnSort | undefined>>;
  handleCellClick?: (cell: Cell<any, unknown>) => void;
  handleSearch: (value: string) => void;
  containerClassName?: string;
  tableClassName?: string;
}

export function TablePages<TData, TValue>({
  isLoading,
  columns,
  data,
  rowsCount,
  rowsPerPage = 10,
  searchValue = '',
  filters,
  handlePageChange,
  setOrderBy = () => {},
  handleCellClick = () => {},
  handleSearch,
  containerClassName = '',
  tableClassName = '',
}: ITableProps<TData, TValue>) {
  const [pageCount, setPageCount] = useState<number>(Math.ceil(rowsCount / rowsPerPage));
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [resetPageCount, setResetPageCount] = useState(false);

  const onColumnFilterChange = (newColumnFilters: any) => {
    setColumnFilters(newColumnFilters);
    setResetPageCount(!resetPageCount);
  };
  const onGlobalFilterChange = (newGlobalFilter: any) => {
    setGlobalFilter(newGlobalFilter);
    setResetPageCount(!resetPageCount);
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: onColumnFilterChange,
    onGlobalFilterChange: onGlobalFilterChange,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    initialState: {
      pagination: { pageSize: rowsPerPage },
    },
  });

  useEffect(() => {
    if (setOrderBy && sorting.length > 0) setOrderBy(sorting[0]);
  }, [sorting, setOrderBy]);

  useEffect(() => {
    if (table.getColumn('metadata')?.getIsVisible())
      table.getColumn('metadata')?.toggleVisibility(false);
  }, [table]);

  useEffect(() => {
    table.setGlobalFilter(searchValue);
  }, [table, searchValue]);

  useEffect(() => {
    // TODO: convert filters to table filters
  }, [table, filters]);

  useEffect(() => {
    if (!globalFilter && columnFilters.length === 0)
      setPageCount(Math.ceil(rowsCount / rowsPerPage));
    else {
      setPageCount(Math.ceil(table.getFilteredRowModel().rows.length / rowsPerPage));
    }
  }, [table, resetPageCount, rowsCount, rowsPerPage, globalFilter, columnFilters]);

  return (
    <div className={containerClassName}>
      <div className="flex flex-row items-center justify-between">
        <SearchBar value={searchValue} onChange={handleSearch} />
        <ColumnSelector table={table} />
      </div>
      <div className={cn('overflow-x-scroll rounded-md border', tableClassName)}>
        <BaseTable>
          <TableHeaders table={table} />
          <TableBody isLoading={isLoading} table={table} handleCellClick={handleCellClick} />
        </BaseTable>
      </div>
      <Pagination table={table} handlePageChange={handlePageChange} />
    </div>
  );
}
