import axios from 'axios';

import { ContractorPayment } from '@/types/ContractorPayment';

export const getContractorPayment = async (
  id: string | null = null
): Promise<ContractorPayment[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor-payment/${id ? `${id}/` : ''}`,
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
