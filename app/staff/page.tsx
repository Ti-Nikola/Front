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

import { deleteStaff } from '@/api/staff/deleteStaff';
import { getStaff } from '@/api/staff/getStaff';
import { CreateStaffForm } from '@/components/forms/staff/CreateStaff';
import { EditStaffForm } from '@/components/forms/staff/EditStaff';
import { ActionButton } from '@/components/table/ActionButton';
import { ColumnSelector } from '@/components/table/ColumnSelector';
import { CreateNewInstance } from '@/components/table/CreateButton';
import { ExpandButton } from '@/components/table/ExpandButton';
import { SearchBar } from '@/components/table/SearchBar';
import { TableScroll } from '@/components/TableScroll';
import { Staff as StaffType } from '@/types/Staff';
import { cn } from '@/utils/cn';
import { formatPhoneNumber } from '@/utils/phone';

const Staff = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const triggerRefetch = () => setReloadKey((prev) => prev + 1);

  const columns: ColumnDef<StaffType>[] = [
    { id: 'nombre_completo', accessorKey: 'nombre_completo', header: 'Nombre' },
    { id: 'area', accessorKey: 'area', header: 'Área' },
    { id: 'mail', accessorKey: 'mail', header: 'Mail' },
    {
      id: 'telefono',
      accessorKey: 'telefono',
      header: 'Teléfono',
      cell: (info) => {
        return formatPhoneNumber(info.getValue() as string);
      },
    },
    { id: 'rut', accessorKey: 'rut', header: 'Rut' },
    { id: 'rol', accessorKey: 'rol', header: 'Rol' },
    {
      id: 'actions',
      enableHiding: false,
      enableSorting: false,
      cell: (info) => (
        <ActionButton
          actions={{
            edit: {
              form: (
                <EditStaffForm
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
        `${row.nombre_completo} ${row.mail} ${row.rut} ${row.telefono} ${row.area} ${row.rol}`,
      header: 'Metadata',
      enableSorting: false,
    },
  ];

  const handleDelete = async (id: string) => {
    await deleteStaff(id);
    triggerRefetch();
  };

  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      const staff = await getStaff();
      setData(staff);
      setIsLoading(false);
    };
    fetchStaff();
  }, [reloadKey]);

  return (
    <StaffTable
      isLoading={isLoading}
      columns={columns}
      data={data}
      triggerRefetch={triggerRefetch}
    />
  );
};

export default Staff;

interface ITableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  initialVisibility?: VisibilityState;
  triggerRefetch: () => void;
}

function StaffTable<TData, TValue>({
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
          <div className="text-4xl font-medium">Staff</div>
          <CreateNewInstance
            instance="staff"
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          >
            <CreateStaffForm
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
