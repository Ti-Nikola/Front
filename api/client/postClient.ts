import axios from 'axios';

import { Client, ClientPost } from '@/types/Clients';

export const postClient = async (data: ClientPost): Promise<Client> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}client/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  console.log(response);
  return response.data;
};
