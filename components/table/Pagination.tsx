import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface IPaginationProps {
  table: any;
  handlePageChange: (page: number) => void;
}

export const Pagination = ({ table, handlePageChange }: IPaginationProps) => {
  const goToFirstPage = () => {
    table.setPageIndex(0);
    handlePageChange(0);
  };
  const goToPreviousPage = () => {
    table.previousPage();
    handlePageChange(table.getState().pagination.pageIndex);
  };
  const goToNextPage = () => {
    table.nextPage();
    handlePageChange(table.getState().pagination.pageIndex);
  };
  const goToLastPage = () => {
    const lastPage = table.getPageCount() - 1;
    table.setPageIndex(lastPage);
    handlePageChange(lastPage);
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
      </div>
      <Button
        variant="outline"
        className="hidden h-8 w-8 p-0 lg:flex"
        onClick={goToFirstPage}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={goToPreviousPage}
        disabled={!table.getCanPreviousPage()}
      >
        Anterior
      </Button>
      <Button variant="outline" size="sm" onClick={goToNextPage} disabled={!table.getCanNextPage()}>
        Siguiente
      </Button>
      <Button
        variant="outline"
        className="hidden h-8 w-8 p-0 lg:flex"
        onClick={goToLastPage}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
