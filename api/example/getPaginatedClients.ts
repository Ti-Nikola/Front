import axios from 'axios';

import { Client } from '@/types/Clients';

interface IGetPaginatedClientsParams {
  page: number;
  pageSize?: number;
  sort?: string;
  filters?: string;
  search?: string;
}

export const getPaginatedClients = async ({
  page,
  pageSize = 10,
  sort = '',
  filters = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search = '',
}: IGetPaginatedClientsParams): Promise<Client[]> => {
  const params = {
    page,
    page_size: pageSize,
    sort,
    filters,
  };
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/clients/`, {
      headers: { 'Content-Type': 'application/json' },
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
