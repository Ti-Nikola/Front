import axios from 'axios';

import { getToken } from '@/utils/auth';

export const deleteContractor = async (id: string): Promise<boolean> => {
  const token = await getToken();

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}contractor/${id}/`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting contractor:', error);
    return false;
  }
};
