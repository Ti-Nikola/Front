import axios from 'axios';

import { ProjectDetail } from '@/types/Project';
import { getToken } from '@/utils/auth';

export const getDetailedProject = async (
  id: string,
  queryParams?: Record<string, any>
): Promise<ProjectDetail> => {
  let token = await getToken();
  let retries = 10;
  while (!token && retries > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    token = await getToken();
    retries--;
  }
  if (!token) {
    console.error('No authentication token provided');
    return {} as ProjectDetail;
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}project/${id}/detail/`,
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
    console.error('Error fetching detailed project:', error);
    return {} as ProjectDetail;
  }
};
