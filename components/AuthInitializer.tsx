'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';

export const AuthInitializer = () => {
  const { getToken } = useAuth();
  const fetchToken = useAuthStore((state) => state.fetchToken);

  useEffect(() => {
    fetchToken(getToken);
  }, [fetchToken, getToken]);

  return null; // No renderiza nada, solo ejecuta fetchToken()
};
