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

import { deleteAsset } from '@/api/asset/deleteAsset';
import { getTableAsset } from '@/api/asset/getTableAsset';
import { CreateAssetForm } from '@/components/forms/asset/CreateAsset';
import { EditAssetForm } from '@/components/forms/asset/EditAsset';
import { ActionButton } from '@/components/table/ActionButton';
import { ColumnSelector } from '@/components/table/ColumnSelector';
import { CreateNewInstance } from '@/components/table/CreateButton';
import { ExpandButton } from '@/components/table/ExpandButton';
import { SearchBar } from '@/components/table/SearchBar';
import { TableScroll } from '@/components/TableScroll';
import type { AssetTable } from '@/types/Asset';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/currency';

const Activo = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const triggerRefetch = () => setReloadKey((prev) => prev + 1);

  const columns: ColumnDef<AssetTable>[] = [
    { id: 'nombre', accessorKey: 'nombre', header: 'Nombre' },
    {
      id: 'valor',
      accessorKey: 'valor',
      header: 'Valor',
      cell: (info) => {
        return formatCurrency(info.getValue() as number);
      },
    },
    {
      id: 'fecha_adquisicion',
      accessorKey: 'fecha_adquisicion',
      header: 'Fecha Adquisición',
      cell: (info) => {
        const date = new Date(info.getValue() as string);
        return date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'numeric',
          year: 'numeric',
        });
      },
    },
    { id: 'codigo_interno', accessorKey: 'codigo_interno', header: 'Código Interno' },
    { id: 'numero_factura', accessorKey: 'numero_factura', header: 'Nº Factura' },
    { id: 'responsable_name', accessorKey: 'responsable_name', header: 'Responsable' },
    {
      id: 'actions',
      enableHiding: false,
      enableSorting: false,
      cell: (info) => (
        <ActionButton
          actions={{
            edit: {
              form: (
                <EditAssetForm
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
        `${row.nombre} ${row.valor} ${row.fecha_adquisicion} ${row.codigo_interno} ${row.numero_factura} ${row.responsable_name}`,
      header: 'Metadata',
      enableSorting: false,
    },
  ];

  const handleDelete = async (id: string) => {
    await deleteAsset(id);
    triggerRefetch();
  };

  useEffect(() => {
    const fetchAsset = async () => {
      setIsLoading(true);

      const asset = await getTableAsset();
      setData(asset);

      setIsLoading(false);
    };
    fetchAsset();
  }, [reloadKey]);

  return (
    <AssetTable
      isLoading={isLoading}
      columns={columns}
      data={data}
      triggerRefetch={triggerRefetch}
    />
  );
};

export default Activo;

interface ITableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  initialVisibility?: VisibilityState;
  triggerRefetch: () => void;
}

function AssetTable<TData, TValue>({
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
          <div className="text-4xl font-medium">Activos</div>
          <CreateNewInstance
            instance="staff"
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          >
            <CreateAssetForm
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
