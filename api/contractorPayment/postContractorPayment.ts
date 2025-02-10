import axios from 'axios';

import { ContractorPayment, ContractorPaymentPost } from '@/types/ContractorPayment';

export const postContractorPayment = async (
  data: Partial<ContractorPaymentPost>
): Promise<ContractorPayment> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor-payment/`,
    JSON.stringify({ ...data }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
