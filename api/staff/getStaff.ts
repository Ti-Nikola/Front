import axios from 'axios';

import { useAuthStore } from '@/store/authStore';
import { Staff } from '@/types/Staff';

export const getStaff = async (): Promise<Staff[]> => {
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}staff/`, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
