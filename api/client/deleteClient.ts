import axios from 'axios';

import { getToken } from '@/utils/auth';

export const deleteClient = async (id: string): Promise<boolean> => {
  const token = await getToken();

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}client/${id}/`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting client:', error);
    return false;
  }
};
