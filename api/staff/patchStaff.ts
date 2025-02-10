import axios from 'axios';

import { Staff } from '@/types/Staff';

export const patchStaff = async (data: Partial<Staff>): Promise<Staff> => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}staff/${data.id}/`,
      JSON.stringify({ ...data }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as Staff;
  }
};
