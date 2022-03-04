import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = <T>(initUrl: string) => {
  const [data, setData] = useState<T | {}>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        setError({});
        const response = await axios(initUrl);
        if (!ignore) setData(response.data);
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    };
    fetchProduct();
    return (() => { ignore = true; });
  }, [initUrl]);

  return { data, loading, error };
};

export default useFetch;