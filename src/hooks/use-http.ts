import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// Define la estructura para la configuración de la petición
interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: { [key: string]: string };
  body?: any; // Se puede usar un tipo genérico si se prefiere
  params?: any;
}

// Define el tipo de retorno del hook, usando un genérico para los datos
interface UseHttpReturn<T> {
  isLoading: boolean;
  error: string | null;
  sendRequest: (requestConfig: RequestConfig, applyData: (data: T) => void) => Promise<void>;
}

const useHttp = <T,>(): UseHttpReturn<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(async (requestConfig: RequestConfig, applyData: (data: T) => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const config: AxiosRequestConfig = {
        url: requestConfig.url,
        method: requestConfig.method || 'GET',
        headers: requestConfig.headers || {},
        data: requestConfig.body,
        params: requestConfig.params,
      };

      const response = await axios<T>(config);
      
      applyData(response.data);

    } catch (err: unknown) {
      let errorMessage = 'Something went wrong!';
      if (axios.isAxiosError(err)) {
        // Axios envuelve los errores HTTP y proporciona una mejor información
        const axiosError = err as AxiosError<{ message?: string }>;
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
