import axios from 'axios';

import { useAuthStore } from '@/store/authStore';

export const deleteProject = async (id: string): Promise<boolean> => {
  let token = useAuthStore.getState().token;
  let retries = 10;
  while (!token && retries > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    token = useAuthStore.getState().token;
    retries--;
  }
  if (!token) {
    console.error('No authentication token available');
    return false;
  }

  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}project/${id}/`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    return response.status === 204;
  } catch (error) {
    console.error(error);
    return false;
  }
};
