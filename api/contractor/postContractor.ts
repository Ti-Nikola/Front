import axios from 'axios';

import { Contractor, ContractorPost } from '@/types/Contractor';
import { getToken } from '@/utils/auth';

export const postContractor = async (data: Partial<ContractorPost>): Promise<Contractor> => {
  try {
    const token = await getToken();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor/`,
      JSON.stringify({ ...data }),
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error posting contractor:', error);
    return {} as Contractor;
  }
};
