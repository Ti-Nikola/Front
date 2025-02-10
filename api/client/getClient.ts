import axios from 'axios';

import { Client } from '@/types/Clients';

export const getClient = async (id: string | null = null): Promise<Client[] | Client> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}client/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
