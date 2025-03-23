import { useState, useEffect } from 'react';
import { fetchCountries } from '../api/countriesApi';
import { Country } from '../types/types';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchCountries();
        setCountries(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch countries. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  return { countries, loading, error };
};
