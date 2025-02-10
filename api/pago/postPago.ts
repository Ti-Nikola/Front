import axios from 'axios';

import { Pago, PagoPost } from '@/types/Pago';

export const postPago = async (data: Partial<PagoPost>): Promise<Pago> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
