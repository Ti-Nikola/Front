import { Table } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { initialVisibleProjectIds } from '@/const/const';

export const ColumnSelector = ({ table }: { table: Table<any> }) => {
  const handleViewAll = () => {
    table.getAllColumns().forEach((column) => {
      if (column.id !== 'metadata') column.toggleVisibility(true);
    });
  };

  const handleHideAll = () => {
    table
      .getAllColumns()
      .filter((column) => column.getCanHide() && !initialVisibleProjectIds.includes(column.id))
      .forEach((column) => column.toggleVisibility(false));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columnas <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="h-[calc(65vh)] overflow-y-auto lg:h-[calc(75vh)]">
        <DropdownMenuCheckboxItem onClick={handleHideAll}>Comprimir</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={handleViewAll}>Expandir</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide() && column.id !== 'metadata')
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {typeof column.columnDef.header === 'function'
                  ? column.id
                  : column.columnDef.header}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
