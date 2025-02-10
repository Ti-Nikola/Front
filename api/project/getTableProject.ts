import axios from 'axios';

import { ProjectTable } from '@/types/Project';

export const getTableProject = async (
  id: string | null = null,
  queryParams?: Record<string, any>
): Promise<ProjectTable[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}project/table/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json' },
        params: queryParams,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
