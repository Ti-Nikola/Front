import axios from 'axios';

import { useAuthStore } from '@/store/authStore';
import { Project } from '@/types/Project';

export const patchProject = async (data: Partial<Project>): Promise<Project> => {
  let token = useAuthStore.getState().token;
  let retries = 10;
  while (!token && retries > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    token = useAuthStore.getState().token;
    retries--;
  }
  if (!token) {
    console.error('No authentication token provided');
    return {} as Project;
  }

  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}project/${data.id}/`,
    JSON.stringify({ ...data }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
