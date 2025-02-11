import { ColumnDef } from '@tanstack/react-table';

export function getInitialColumnVisibility(
  columns: ColumnDef<any>[],
  visibleIds: string[]
): Record<string, boolean> {
  return columns.reduce(
    (visibility, column) => {
      if (column.id) {
        visibility[column.id] = visibleIds.includes(column.id);
      }
      return visibility;
    },
    {} as Record<string, boolean>
  );
}
