import axios from 'axios';

import { Pago } from '@/types/Pago';
import { getToken } from '@/utils/auth';

export const patchPago = async (data: Partial<Pago>): Promise<Pago> => {
  try {
    const token = await getToken();

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/${data.id}/`,
      JSON.stringify({ ...data }),
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating payment:', error);
    return {} as Pago;
  }
};
