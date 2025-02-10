import { FilterForm } from '@/components/forms/project/filter/FilterForm';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ProjectTable } from '@/types/Project';

export const Filter = ({ setData }: { setData: (data: ProjectTable[]) => void }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </SheetTrigger>
      <SheetContent className="max-w-[900px]">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Filtra los resultados de la tabla por:</SheetDescription>
        </SheetHeader>
        <FilterForm setData={setData} />
      </SheetContent>
    </Sheet>
  );
};
