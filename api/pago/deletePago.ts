import axios from 'axios';

export const deletePago = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}payment/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.status === 204;
  } catch (error) {
    console.error(error);
    return false;
  }
};
