import axios from 'axios';

import { getToken } from '@/utils/auth';

export const deleteContractorPayment = async (id: string): Promise<boolean> => {
  const token = await getToken();

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor-payment/${id}/`,
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.status === 204;
  } catch (error) {
    console.error(error);
    return false;
  }
};
