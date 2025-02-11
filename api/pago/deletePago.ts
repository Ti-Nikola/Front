import axios from 'axios';

import { getToken } from '@/utils/auth';

export const deletePago = async (id: string): Promise<boolean> => {
  try {
    const token = await getToken();

    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}payment/${id}/`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting payment:', error);
    return false;
  }
};
