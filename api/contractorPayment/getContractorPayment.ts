import axios from 'axios';

import { ContractorPayment } from '@/types/ContractorPayment';
import { getToken } from '@/utils/auth';

export const getContractorPayment = async (
  id: string | null = null
): Promise<ContractorPayment[]> => {
  const token = await getToken();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor-payment/${id ? `${id}/` : ''}`,
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
