import { useState, useEffect, useCallback } from 'react';

export const useVisitedCountries = () => {
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const storedVisited = localStorage.getItem('visitedCountries');
    if (storedVisited) {
      setVisitedCountries(new Set(JSON.parse(storedVisited)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'visitedCountries',
      JSON.stringify(Array.from(visitedCountries))
    );
  }, [visitedCountries]);

  const toggleCountryVisited = useCallback((countryCode: string) => {
    setVisitedCountries((prevVisited) => {
      const newVisited = new Set(prevVisited);
      if (newVisited.has(countryCode)) {
        newVisited.delete(countryCode);
      } else {
        newVisited.add(countryCode);
      }
      return newVisited;
    });
  }, []);

  return {
    visitedCountries,
    toggleCountryVisited,
    isVisited: useCallback(
      (countryCode: string) => visitedCountries.has(countryCode),
      [visitedCountries]
    ),
  };
};
