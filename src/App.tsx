import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import CountryList from './components/CountryList';
import { useCountries } from './hooks/useCountries';
import { useVisitedCountries } from './hooks/useVisitedCountries';
import { FilterState } from './types/types';
import './styles.css';

const App: React.FC = () => {
  const { countries, loading, error } = useCountries();
  const { visitedCountries, toggleCountryVisited } = useVisitedCountries();

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedRegion: 'All',
    sortField: 'name',
    sortDirection: 'asc',
  });

  const handleFilterChange = useCallback(
    (updatedFilters: Partial<FilterState>) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...updatedFilters,
      }));
    },
    []
  );

  if (loading) {
    return <div className="loading">Loading countries...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <Header />

      <main className="container">
        <FilterControls filters={filters} onFilterChange={handleFilterChange} />

        <CountryList
          countries={countries}
          filters={filters}
          visitedCountries={visitedCountries}
          onToggleVisited={toggleCountryVisited}
        />
      </main>
    </div>
  );
};

export default App;
