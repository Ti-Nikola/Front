import axios from 'axios';

import { Pago, PagoPost } from '@/types/Pago';
import { getToken } from '@/utils/auth';

export const postPago = async (data: Partial<PagoPost>): Promise<Pago> => {
  try {
    const token = await getToken();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/`,
      JSON.stringify({ ...data }),
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error posting payment:', error);
    return {} as Pago;
  }
};
