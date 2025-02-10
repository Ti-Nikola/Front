import axios from 'axios';

import { Contractor } from '@/types/Contractor';

export const getContractor = async (id: string | null = null): Promise<Contractor[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}contractor/${id ? `${id}/` : ''}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
