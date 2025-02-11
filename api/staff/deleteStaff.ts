import axios from 'axios';

import { getToken } from '@/utils/auth';

export const deleteStaff = async (id: string): Promise<boolean> => {
  try {
    const token = await getToken();

    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}staff/${id}/`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting staff:', error);
    return false;
  }
};
