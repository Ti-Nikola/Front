import axios from 'axios';

export const deleteContractor = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}contractor/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    return response.status === 204;
  } catch (error) {
    console.error(error);
    return false;
  }
};
