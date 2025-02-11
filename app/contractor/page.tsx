'use client';

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { deleteContractor } from '@/api/contractor/deleteContractor';
import { getContractor } from '@/api/contractor/getContractor';
import { CreateContractorForm } from '@/components/forms/contractor/CreateContractor';
import { EditContractorForm } from '@/components/forms/contractor/EditContractor';
import { ActionButton } from '@/components/table/ActionButton';
import { ColumnSelector } from '@/components/table/ColumnSelector';
import { CreateNewInstance } from '@/components/table/CreateButton';
import { ExpandButton } from '@/components/table/ExpandButton';
import { SearchBar } from '@/components/table/SearchBar';
import { TableScroll } from '@/components/TableScroll';
import { Contractor } from '@/types/Contractor';
import { cn } from '@/utils/cn';
import { formatPercentageToDisplay } from '@/utils/numbers';
import { formatPhoneNumber } from '@/utils/phone';

const Contratista = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const triggerRefetch = () => setReloadKey((prev) => prev + 1);

  const columns: ColumnDef<Contractor>[] = [
    { id: 'nombre', accessorKey: 'nombre', header: 'Nombre' },
    {
      id: 'telefono',
      accessorKey: 'telefono',
      header: 'Teléfono',
      cell: (info) => {
        return formatPhoneNumber(info.getValue() as string);
      },
    },
    { id: 'mail', accessorKey: 'mail', header: 'Mail' },
    { id: 'rut', accessorKey: 'rut', header: 'Rut' },
    { id: 'rut_empresa', accessorKey: 'rut_empresa', header: 'Rut Empresa' },
    { id: 'nombre_empresa', accessorKey: 'nombre_empresa', header: 'Nombre Empresa' },
    {
      id: 'representante_empresa',
      accessorKey: 'representante_empresa',
      header: 'Representante Empresa',
    },
    {
      id: 'porcentaje_de_pago_1',
      accessorKey: 'porcentaje_de_pago_1',
      header: 'Pago 1',
      cell: (info) => {
        return info.getValue() ? formatPercentageToDisplay(info.getValue() as number) : '0 %';
      },
    },
    {
      id: 'porcentaje_de_pago_2',
      accessorKey: 'porcentaje_de_pago_2',
      header: 'Pago 2',
      cell: (info) => {
        return info.getValue() ? formatPercentageToDisplay(info.getValue() as number) : '0 %';
      },
    },
    {
      id: 'porcentaje_de_pago_3',
      accessorKey: 'porcentaje_de_pago_3',
      header: 'Pago 3',
      cell: (info) => {
        return info.getValue() ? formatPercentageToDisplay(info.getValue() as number) : '0 %';
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      enableSorting: false,
      cell: (info) => (
        <ActionButton
          actions={{
            edit: {
              form: (
                <EditContractorForm
                  data={info.row.original}
                  onClose={triggerRefetch}
                  triggerRefetch={triggerRefetch}
                />
              ),
            },
            delete: {
              onDelete: () => handleDelete(info.row.original.id.toString()),
            },
          }}
        />
      ),
    },
    {
      id: 'metadata',
      accessorFn: (row) =>
        `${row.nombre} ${row.mail} ${row.rut} ${row.telefono} ${row.rut_empresa} ${row.nombre_empresa} ${row.representante_empresa}`,
      header: 'Metadata',
      enableSorting: false,
    },
  ];

  const handleDelete = async (id: string) => {
    await deleteContractor(id);
    triggerRefetch();
  };

  useEffect(() => {
    const fetchContractor = async () => {
      setIsLoading(true);

      const contractor = await getContractor();
      setData(contractor);

      setIsLoading(false);
    };
    fetchContractor();
  }, [reloadKey]);

  return (
    <ContractorTable
      isLoading={isLoading}
      columns={columns}
      data={data}
      triggerRefetch={triggerRefetch}
    />
  );
};

export default Contratista;

interface ITableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  initialVisibility?: VisibilityState;
  triggerRefetch: () => void;
}

function ContractorTable<TData, TValue>({
  data,
  columns,
  isLoading,
  initialVisibility,
  triggerRefetch,
}: ITableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialVisibility || {}
  );
  const [expand, setExpand] = useState(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onGlobalFilterChange = (newGlobalFilter: any) => {
    setGlobalFilter(newGlobalFilter);
  };

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: onGlobalFilterChange,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:p-10">
      <div className={cn('w-full items-center justify-center space-y-5', !expand && 'max-w-7xl')}>
        <div className="mb-8 flex justify-between">
          <div className="text-4xl font-medium">Contratistas</div>
          <CreateNewInstance
            instance="staff"
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          >
            <CreateContractorForm
              onClose={() => setIsDialogOpen(false)}
              triggerRefetch={triggerRefetch}
            />
          </CreateNewInstance>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 md:flex-nowrap md:justify-between">
          <SearchBar value={searchValue} onChange={setSearchValue} />
          <div className="flex gap-2">
            <ExpandButton expand={expand} setExpand={setExpand} />
            {/* <Filter table={table} /> */}
            <ColumnSelector table={table} />
          </div>
        </div>

        <TableScroll table={table} isLoading={isLoading} searchValue={searchValue} />
      </div>
    </div>
  );
}
