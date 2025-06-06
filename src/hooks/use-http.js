import { useState, useCallback } from 'react';
import axios from 'axios';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Axios request configuration:
      // url: requestConfig.url
      // method: requestConfig.method (defaults to 'get' if not specified)
      // headers: requestConfig.headers
      // data: requestConfig.body (for POST, PUT, PATCH)
      // params: requestConfig.params (for GET request query parameters)

      const config = {
        url: requestConfig.url,
        method: requestConfig.method ? requestConfig.method.toLowerCase() : 'get',
        headers: requestConfig.headers ? requestConfig.headers : {},
      };

      if (requestConfig.body) {
        config.data = requestConfig.body; // axios uses 'data' for the request body
      }

      if (requestConfig.params) {
        config.params = requestConfig.params;
      }

      const response = await axios(config);
      
      // axios automatically parses JSON response, so response.data is the parsed object
      applyData(response.data);
    } catch (err) {
      // axios wraps errors in err.response for HTTP errors (e.g., 404, 500)
      // and err.message for network errors or other issues
      setError(err.response?.data?.message || err.message || 'Something went wrong!');
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