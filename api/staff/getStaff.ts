import axios from 'axios';

import { Staff } from '@/types/Staff';

export const getStaff = async (): Promise<Staff[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}staff/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
