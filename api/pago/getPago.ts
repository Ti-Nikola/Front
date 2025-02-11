import axios from 'axios';

import { Pago } from '@/types/Pago';
import { getToken } from '@/utils/auth';

export const getPago = async (id: string | null = null): Promise<Pago[]> => {
  try {
    const token = await getToken();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting payment:', error);
    return [];
  }
};
