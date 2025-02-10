import axios from 'axios';

import { Client } from '@/types/Clients';

export const patchClient = async (data: Partial<Client>): Promise<Client> => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}client/${data.id}/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
