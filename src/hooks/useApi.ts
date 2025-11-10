import { useState, useCallback } from 'react';
import { useLoader } from '../context/LoaderContext';
import type { ApiError } from '../types';

export const useApi = () => {
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoader();

  const execute = useCallback(
    async <T,>(apiCall: () => Promise<T>): Promise<T | null> => {
      setError(null);
      setLoading(true);
      try {
        const result = await apiCall();
        return result;
      } catch (err: any) {
        const apiError = err.response?.data as ApiError;
        const errorMessage = apiError?.error || apiError?.message || 'Ocorreu um erro inesperado';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  ) as <T,>(apiCall: () => Promise<T>) => Promise<T | null>;

  return { execute, error, setError };
};

