import { Country, FilterState, SortDirection, SortField, Region } from '../types/types';

export const filterBySearch = (countries: Country[], searchQuery: string): Country[] => {
  if (!searchQuery) return countries;
  
  const query = searchQuery.toLowerCase();
  return countries.filter(country => 
    country.name.common.toLowerCase().includes(query) || 
    country.name.official.toLowerCase().includes(query)
  );
};

export const filterByRegion = (countries: Country[], region: Region): Country[] => {
  if (region === 'All') return countries;
  return countries.filter(country => country.region === region);
};

export const sortCountries = (
  countries: Country[], 
  sortField: SortField, 
  sortDirection: SortDirection
): Country[] => {
  return [...countries].sort((a, b) => {
    let comparison = 0;

    if (sortField === 'name') {
      comparison = a.name.common.localeCompare(b.name.common);
    } else if (sortField === 'population') {
      comparison = a.population - b.population;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });
};

export const applyFilters = (
  countries: Country[], 
  filters: FilterState
): Country[] => {
  const { searchQuery, selectedRegion, sortField, sortDirection } = filters;
  
  let filteredCountries = filterByRegion(countries, selectedRegion);
  filteredCountries = filterBySearch(filteredCountries, searchQuery);
  return sortCountries(filteredCountries, sortField, sortDirection);
};