import axios from 'axios';

import { Comuna } from '@/types/Directions';
import { getToken } from '@/utils/auth';
export const getComuna = async (id: string | null = null): Promise<Comuna[]> => {
  const token = await getToken();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}comuna/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
