import axios from 'axios';

import { Contractor } from '@/types/Contractor';

export const patchContractor = async (data: Partial<Contractor>): Promise<Contractor> => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor/${data.id}/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
