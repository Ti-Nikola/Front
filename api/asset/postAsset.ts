import axios from 'axios';

import { Asset, AssetPost } from '@/types/Asset';

export const postAsset = async (data: AssetPost): Promise<Asset> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}asset/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
