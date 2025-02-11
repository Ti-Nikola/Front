import axios from 'axios';

import { Client, ClientPost } from '@/types/Clients';
import { getToken } from '@/utils/auth';

export const postClient = async (data: ClientPost): Promise<Client> => {
  try {
    const token = await getToken();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}client/`,
      JSON.stringify({ ...data }),
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error posting client:', error);
    return {} as Client;
  }
};
