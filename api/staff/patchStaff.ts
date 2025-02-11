import axios from 'axios';

import { Staff } from '@/types/Staff';
import { getToken } from '@/utils/auth';

export const patchStaff = async (data: Partial<Staff>): Promise<Staff> => {
  try {
    const token = await getToken();

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}staff/${data.id}/`,
      JSON.stringify({ ...data }),
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating staff:', error);
    return {} as Staff;
  }
};
