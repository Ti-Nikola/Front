import { GetToken } from '@clerk/types';
import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  loading: boolean;
  fetchToken: (getToken: GetToken) => Promise<void>;
  getValidToken: (getToken: GetToken) => Promise<string | null>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  loading: true,

  fetchToken: async (getToken) => {
    const authToken = await getToken();
    set({ token: authToken, loading: false });
  },

  getValidToken: async (getToken) => {
    const authToken = await getToken();
    set({ token: authToken });
    return authToken;
  },
}));
