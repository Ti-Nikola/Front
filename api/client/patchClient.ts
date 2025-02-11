import axios from 'axios';

import { Client } from '@/types/Clients';
import { getToken } from '@/utils/auth';

export const patchClient = async (data: Partial<Client>): Promise<Client> => {
  const token = await getToken();

  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}client/${data.id}/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
