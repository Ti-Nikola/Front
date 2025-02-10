import axios from 'axios';

import { AssetTable } from '@/types/Asset';

export const getTableAsset = async (): Promise<AssetTable[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}asset/table/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
