'use client';

import {
  Cell,
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Megaphone, MegaphoneOff, Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { deleteProject } from '@/api/project/deleteProject';
import { getTableProject } from '@/api/project/getTableProject';
import { ActionButton } from '@/components/table/ActionButton';
import { ColumnSelector } from '@/components/table/ColumnSelector';
import { ExpandButton } from '@/components/table/ExpandButton';
import { Filter } from '@/components/table/Filter';
import { SearchBar } from '@/components/table/SearchBar';
import { TableScroll } from '@/components/TableScroll';
import { Button } from '@/components/ui/button';
import { initialVisibleProjectIds } from '@/const/const';
import { ProjectTable as ProjectTableType } from '@/types/Project';
import { cn } from '@/utils/cn';
import { formatCurrency } from '@/utils/currency';
import { getProjectKey } from '@/utils/getProjectTitle';
import { getInitialColumnVisibility } from '@/utils/table';

const Projects = () => {
  const router = useRouter();

  const [data, setData] = useState<ProjectTableType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const triggerRefetch = () => setReloadKey((prev) => prev + 1);

  const columns: ColumnDef<ProjectTableType>[] = [
    {
      id: 'key',
      accessorKey: 'key',
      header: 'Key',
      cell: (e) => {
        return getProjectKey(e.row.original.tipo_proyecto, e.getValue() as number);
      },
    },
    { id: 'titulo', accessorKey: 'titulo', header: 'Título' },
    { id: 'etapa_proyecto', accessorKey: 'etapa_proyecto', header: 'Etapa Proyecto' },
    {
      id: 'estado_proyecto',
      accessorKey: 'estado_proyecto',
      header: 'Estado Proyecto',
      cell: (e) => {
        const bgColor =
          e.getValue() === 'verde'
            ? 'bg-green-500'
            : e.getValue() === 'amarillo'
              ? 'bg-yellow-500'
              : 'bg-red-500';
        return <div className={cn('mx-auto size-5 rounded-md', bgColor)}></div>;
      },
    },
    { id: 'client_name', accessorKey: 'client_name', header: 'Cliente' },
    { id: 'vendedor_name', accessorKey: 'vendedor_name', header: 'Vendedor' },
    { id: 'ingeniero_name', accessorKey: 'ingeniero_name', header: 'Ingeniero' },
    { id: 'contratista_name', accessorKey: 'contratista_name', header: 'Contratista' },
    { id: 'direccion', accessorKey: 'direccion', header: 'Dirección' },
    { id: 'comuna_name', accessorKey: 'comuna_name', header: 'Comuna' },
    { id: 'distribuidora', accessorKey: 'distribuidora', header: 'Distribuidora' },
    { id: 'banco', accessorKey: 'banco', header: 'Banco' },
    { id: 'opcion_tarifa', accessorKey: 'opcion_tarifa', header: 'Opción Tarifa' },
    { id: 'financiamiento', accessorKey: 'financiamiento', header: 'Financiamiento' },
    { id: 'facturacion_naturaleza', accessorKey: 'facturacion_naturaleza', header: 'Facturación' },
    {
      id: 'precio_venta_neto',
      accessorKey: 'precio_venta_neto',
      header: 'Precio Venta Neto',
      cell: (info) => {
        return formatCurrency(info.getValue() as number);
      },
    },
    {
      id: 'presupuesto_original_contratista',
      accessorKey: 'presupuesto_original_contratista',
      header: 'Presupuesto_original_contratista',
      cell: (info) => {
        return formatCurrency(info.getValue() as number);
      },
    },
    {
      id: 'fecha_firma_contrato',
      accessorKey: 'fecha_firma_contrato',
      header: 'Fecha Firma Contrato',
      cell: (info) => {
        const date = new Date(info.getValue() as string);
        return date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'numeric',
          year: 'numeric',
        });
      },
    },
    { id: 'numero_proceso_sec', accessorKey: 'numero_proceso_sec', header: 'Nº Proceso SEC' },
    { id: 'peak_kwp', accessorKey: 'peak_kwp', header: 'Peak (kWp)' },
    { id: 'potencia_kw', accessorKey: 'potencia_kw', header: 'Potencia Inversor (kW)' },
    {
      id: 'baterias_kwh',
      header: 'Baterias (kwh)',
      cell: (info) => {
        return (
          Number(info.row.original.numero_baterias) *
          Number(info.row.original.capacidad_baterias_kwh)
        );
      },
    },
    { id: 'diferencial_mA', accessorKey: 'diferencial_mA', header: 'Diferencial (mA)' },
    { id: 'tipo_empalme', accessorKey: 'tipo_empalme', header: 'Tipo Empalme' },
    { id: 'tipo_proyecto', accessorKey: 'tipo_proyecto', header: 'Tipo Proyecto' },
    { id: 'tipo_instalacion', accessorKey: 'tipo_instalacion', header: 'Tipo Instalacion' },
    { id: 'sistema_respaldo', accessorKey: 'sistema_respaldo', header: 'Sistema Respaldo' },
    {
      id: 'diferencial_presenta_caidas',
      accessorKey: 'diferencial_presenta_caidas',
      header: 'Caídas Diferencial',
      cell: (info) => {
        return (
          <div className="flex items-center justify-center">
            {info.getValue() ? (
              <Megaphone className="text-red-500" />
            ) : (
              <MegaphoneOff className="text-green-400" />
            )}
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      enableSorting: false,
      cell: (info) => (
        <ActionButton
          actions={{
            copy: {
              onCopy: () => navigator.clipboard.writeText(info.row.original.direccion),
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
        `${row.titulo} ${row.direccion} ${row.comuna_name} ${row.estado_proyecto} `,
      header: 'Metadata',
      enableSorting: false,
    },
  ];

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    triggerRefetch();
  };

  const initialVisibility = getInitialColumnVisibility(columns, initialVisibleProjectIds);

  const handleCellClick = (cell: Cell<any, unknown>): void => {
    if (cell.column.id === 'select') {
      cell.row.toggleSelected();
    } else if (cell.column.id === 'titulo') {
      router.push(`/projects/${cell.row.original.id}`);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getTableProject();
        setData(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [reloadKey]);

  return (
    <ProjectTable
      data={data}
      setData={setData}
      columns={columns}
      isLoading={isLoading}
      initialVisibility={initialVisibility}
      handleCellClick={handleCellClick}
    />
  );
};

export default Projects;

interface ITableProps<TData, TValue> {
  data: TData[];
  setData: (data: ProjectTableType[]) => void;
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  initialVisibility?: VisibilityState;
  handleCellClick?: (cell: Cell<any, unknown>) => void;
}

function ProjectTable<TData, TValue>({
  data,
  setData,
  columns,
  isLoading,
  initialVisibility,
  handleCellClick,
}: ITableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialVisibility || {}
  );
  const [expand, setExpand] = useState(true);
  const [searchValue, setSearchValue] = useState<string>('');

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
          <div className="text-4xl font-medium">Proyectos</div>
          <CreateNewButton />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 md:flex-nowrap md:justify-between">
          <SearchBar value={searchValue} onChange={setSearchValue} />
          <div className="flex gap-2">
            <ExpandButton expand={expand} setExpand={setExpand} />
            <Filter setData={setData} />
            <ColumnSelector table={table} />
          </div>
        </div>

        <TableScroll
          table={table}
          handleCellClick={handleCellClick}
          isLoading={isLoading}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
}

const CreateNewButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button onClick={() => router.push(`${pathname}/new`)}>
      <Plus className="size-6" />
      Crear
    </Button>
  );
};
