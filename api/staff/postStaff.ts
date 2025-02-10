import axios from 'axios';

import { Staff, StaffPost } from '@/types/Staff';

export const postStaff = async (data: StaffPost): Promise<Staff> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}staff/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
