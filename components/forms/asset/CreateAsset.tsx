import { z } from 'zod';

import { postAsset } from '@/api/asset/postAsset';
import { useToast } from '@/hooks/use-toast';
import { parseAsset } from '@/utils/parseTypes';

import { AssetForm, AssetFormSchema } from './AssetForm';

export const CreateAssetForm = ({
  onClose,
  triggerRefetch,
}: {
  onClose: () => void;
  triggerRefetch: () => void;
}) => {
  const { toast } = useToast();

  async function handleSubmit(data: z.infer<typeof AssetFormSchema>) {
    const asset = parseAsset(data);

    await postAsset(asset);

    triggerRefetch();

    toast({ description: 'Activo creado' });
    setTimeout(() => {
      onClose();
    }, 1000);
  }

  return <AssetForm handleSubmit={handleSubmit} schema={AssetFormSchema} title="Crear Activo" />;
};
