import axios from 'axios';

import { ProjectDetail } from '@/types/Project';

export const getDetailedProject = async (
  id: string,
  queryParams?: Record<string, any>
): Promise<ProjectDetail> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}project/${id}/detail/`,
      {
        headers: { 'Content-Type': 'application/json' },
        params: queryParams,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as ProjectDetail;
  }
};
