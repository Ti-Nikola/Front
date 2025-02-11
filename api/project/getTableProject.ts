import axios from 'axios';

import { useAuthStore } from '@/store/authStore';
import { ProjectTable } from '@/types/Project';

export const getTableProject = async (
  id: string | null = null,
  queryParams?: Record<string, any>
): Promise<ProjectTable[]> => {
  let token = useAuthStore.getState().token;
  let retries = 10;

  while (!token && retries > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    token = useAuthStore.getState().token;
    retries--;
  }
  if (!token) {
    console.error('No authentication token provided');
    return [];
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}project/table/${id ? `${id}/` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: queryParams,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching project table:', error);
    return [];
  }
};
