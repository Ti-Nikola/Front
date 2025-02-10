import axios from 'axios';

import { Pago } from '@/types/Pago';

export const patchPago = async (data: Partial<Pago>): Promise<Pago> => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}payment/${data.id}/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
