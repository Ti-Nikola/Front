import axios from 'axios';

import { Pago } from '@/types/Pago';

export const getPago = async (id: string | null = null): Promise<Pago[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
