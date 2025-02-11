import axios from 'axios';

import { ContractorPayment, ContractorPaymentPost } from '@/types/ContractorPayment';
import { getToken } from '@/utils/auth';
export const postContractorPayment = async (
  data: Partial<ContractorPaymentPost>
): Promise<ContractorPayment> => {
  const token = await getToken();

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor-payment/`,
    JSON.stringify({ ...data }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
