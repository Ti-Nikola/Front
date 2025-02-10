import { z } from 'zod';

import { patchAsset } from '@/api/asset/patchAsset';
import { useToast } from '@/hooks/use-toast';
import { Asset } from '@/types/Asset';
import { areValuesEqual } from '@/utils/comparison';
import { formatStrToDate } from '@/utils/dates';
import { formatStr, parseAsset } from '@/utils/parseTypes';

import { AssetForm, OptionalAssetFormSchema } from './AssetForm';

export const EditAssetForm = ({
  data,
  onClose,
  triggerRefetch,
}: {
  data: Asset;
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  const defaultValues = {
    id: data.id,
    nombre: data.nombre,
    valor: formatStr(data.valor),
    fecha_adquisicion: formatStrToDate(data.fecha_adquisicion),
    codigo_interno: data.codigo_interno,
    numero_factura: formatStr(data.numero_factura),
    responsable: data.responsable,
  };

  async function handleSubmit(data: z.infer<typeof OptionalAssetFormSchema>) {
    if (areValuesEqual(defaultValues, data)) {
      toast({ title: 'No hay cambios', description: 'No se realizaron cambios en el formulario.' });
      return;
    }
    const asset = parseAsset(data);

    await patchAsset(asset);

    triggerRefetch();

    toast({ description: 'Contratista actualizado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return (
    <AssetForm
      handleSubmit={handleSubmit}
      schema={OptionalAssetFormSchema}
      defaultValues={defaultValues}
      title="Editar Contratista"
    />
  );
};
