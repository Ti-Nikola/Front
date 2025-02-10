import axios from 'axios';

import { Project } from '@/types/Project';

export const patchProject = async (data: Partial<Project>): Promise<Project> => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}project/${data.id}/`,
    JSON.stringify({ ...data }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
