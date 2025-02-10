import axios from 'axios';

import { Project, ProjectPost } from '@/types/Project';

export const postProject = async (data: ProjectPost): Promise<Project> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}project/`,
    JSON.stringify({ ...data }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
