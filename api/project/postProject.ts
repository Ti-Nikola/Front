import axios from 'axios';

import { Project, ProjectPost } from '@/types/Project';
import { getToken } from '@/utils/auth';

export const postProject = async (data: ProjectPost): Promise<Project> => {
  try {
    const token = await getToken();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}project/`,
      JSON.stringify({ ...data }),
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error posting project:', error);
    return {} as Project;
  }
};
