import axios from 'axios';

import { Staff, StaffPost } from '@/types/Staff';
import { getToken } from '@/utils/auth';

export const postStaff = async (data: StaffPost): Promise<Staff> => {
  try {
    const token = await getToken();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}staff/`,
      JSON.stringify({ ...data }),
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error posting staff:', error);
    return {} as Staff;
  }
};
