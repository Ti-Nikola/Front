'use client';

import { Button } from '@/components/ui/button';
import { LOCAL_STORAGE_KEY_DATA, LOCAL_STORAGE_KEY_POST_PROJECT } from '@/const/const';

export const DeleteProjectDataForm = () => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-12 text-3xl font-medium">Borrar</h1>
      <Button
        onClick={() => {
          if (typeof window !== 'undefined')
            localStorage.removeItem(LOCAL_STORAGE_KEY_POST_PROJECT);
          if (typeof window !== 'undefined') localStorage.removeItem(LOCAL_STORAGE_KEY_DATA);
          if (window) window.location.reload();
        }}
      >
        Limpiar Formulario
      </Button>
    </div>
  );
};
