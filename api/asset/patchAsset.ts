import axios from 'axios';

import { Asset } from '@/types/Asset';

export const patchAsset = async (data: Partial<Asset>): Promise<Asset> => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}asset/${data.id}/`,
      JSON.stringify({ ...data }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as Asset;
  }
};
