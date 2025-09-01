import { useState, useEffect } from 'react';

/**
 * React hook to fetch data from a given URL with optional configuration.
 * @param {string} url The URL to fetch data from.
 * @param {object} [options={}] The options to pass to the fetch function.
 * @returns {{data: any, error: any, loading: boolean}} An object containing the fetched data, error if any, and loading state.
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, error, loading };
};

export default useFetch;