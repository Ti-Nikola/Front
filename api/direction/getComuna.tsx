import axios from 'axios';

import { Comuna } from '@/types/Directions';

export const getComuna = async (id: string | null = null): Promise<Comuna[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}comuna/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
