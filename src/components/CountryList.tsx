import React, { useMemo } from 'react';
import { Country, FilterState } from '../types/types';
import CountryCard from './CountryCard';
import { applyFilters } from '../utils/filterUtils';

interface CountryListProps {
  countries: Country[];
  filters: FilterState;
  visitedCountries: Set<string>;
  onToggleVisited: (countryCode: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  filters,
  visitedCountries,
  onToggleVisited
}) => {
  const filteredCountries = useMemo(() => {
    return applyFilters(countries, filters);
  }, [countries, filters]);

  if (filteredCountries.length === 0) {
    return (
      <div className="no-results">
        <p>No countries found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="country-list">
      {filteredCountries.map(country => (
        <CountryCard
          key={country.cca3}
          country={country}
          isVisited={visitedCountries.has(country.cca3)}
          onToggleVisited={onToggleVisited}
        />
      ))}
    </div>
  );
};

export default React.memo(CountryList);
