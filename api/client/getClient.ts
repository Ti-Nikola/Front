import axios from 'axios';

import { Client } from '@/types/Clients';
import { getToken } from '@/utils/auth';

export const getClient = async (id: string | null = null): Promise<Client[] | Client> => {
  try {
    const token = await getToken();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}client/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting client:', error);
    return [];
  }
};
