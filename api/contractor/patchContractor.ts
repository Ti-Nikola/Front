import axios from 'axios';

import { Contractor } from '@/types/Contractor';
import { getToken } from '@/utils/auth';

export const patchContractor = async (data: Partial<Contractor>): Promise<Contractor> => {
  const token = await getToken();

  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor/${data.id}/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
