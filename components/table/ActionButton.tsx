'use client';

import { MoreHorizontal } from 'lucide-react';
import { JSX, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type ActionButtonType = 'copy' | 'edit' | 'delete';

export interface IActionButton {
  edit?: {
    form: JSX.Element;
  };
  delete?: {
    onDelete: () => void;
  };
  copy?: {
    onCopy: () => void;
  };
}

export const ActionButton = ({ actions }: { actions: IActionButton }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const copy = actions.copy;
  const edit = actions.edit;
  const del = actions.delete;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {copy && (
            <DropdownMenuItem onClick={() => copy.onCopy}>Copiar dirección</DropdownMenuItem>
          )}
          {edit && (
            <DropdownMenuItem
              onClick={() => {
                setIsDialogOpen(true);
              }}
            >
              Editar
            </DropdownMenuItem>
          )}
          {del && (
            <DropdownMenuItem
              onClick={() => {
                setIsAlertOpen(true);
              }}
            >
              Eliminar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {del && (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Una vez eliminado, los datos no se podrán
                recuperar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  del.onDelete();
                  setIsAlertOpen(false);
                }}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {edit && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-h-[calc(90vh)] max-w-[400px] overflow-scroll md:max-w-[600px] lg:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>Editar</DialogTitle>
              <DialogDescription className="pb-4">
                Edita los campos y guarda los cambios.
              </DialogDescription>
              {edit.form}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
