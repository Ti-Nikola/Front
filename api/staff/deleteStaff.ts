import axios from 'axios';

export const deleteStaff = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}staff/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.status === 204;
  } catch (error) {
    console.error(error);
    return false;
  }
};
