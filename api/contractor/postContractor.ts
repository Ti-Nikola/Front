import axios from 'axios';

import { Contractor, ContractorPost } from '@/types/Contractor';

export const postContractor = async (data: Partial<ContractorPost>): Promise<Contractor> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  console.log(response);
  return response.data;
};
