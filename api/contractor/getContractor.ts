import axios from 'axios';

import { Contractor } from '@/types/Contractor';
import { getToken } from '@/utils/auth';

export const getContractor = async (id: string | null = null): Promise<Contractor[]> => {
  try {
    const token = await getToken();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting contractor:', error);
    return [];
  }
};
