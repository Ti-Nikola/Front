import axios from 'axios';

import { ContractorPayment } from '@/types/ContractorPayment';

export const patchContractorPayment = async (
  data: Partial<ContractorPayment>
): Promise<ContractorPayment> => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor-payment/${data.id}/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
