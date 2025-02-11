import { useAuthStore } from '@/store/authStore';

export const getToken = async () => {
  let token = useAuthStore.getState().token;
  let retries = 10;

  while (!token && retries > 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    token = useAuthStore.getState().token;
    retries--;
  }

  if (!token) {
    console.error('No authentication token provided');
    throw new Error('No authentication token available');
  }

  return token;
};
