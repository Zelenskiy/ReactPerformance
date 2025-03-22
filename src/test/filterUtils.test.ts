import { describe, it, expect } from 'vitest';
import { mockCountries } from '../test/mockData';
import { filterBySearch } from '../utils/filterUtils';
import { Country } from '../types/types';

describe('filterUtils', () => {
  describe('filterBySearch', () => {
    it('returns all countries when search query is empty', () => {
      const result = filterBySearch(mockCountries, '');
      expect(result).toEqual(mockCountries);
    });

    it('filters countries by name (case insensitive)', () => {
      const result = filterBySearch(mockCountries, 'fin');
      expect(result).toHaveLength(1);
      expect(result[0].name.common).toBe('Finland');
    });

    it('filters countries by official name', () => {
      const result = filterBySearch(mockCountries, 'republic');
      expect(result).toHaveLength(2);
    });

    it('returns empty array when no countries match the search', () => {
      const result = filterBySearch(mockCountries, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('filterByRegion', () => {
    it('returns all countries when region is "All"', () => {
      const result = filterByRegion(mockCountries, 'All');
      expect(result).toEqual(mockCountries);
    });

    it('filters countries by region', () => {
      const result = filterByRegion(mockCountries, 'Europe');
      expect(result).toHaveLength(1);
      expect(result[0].name.common).toBe('Finland');
    });

    it('returns empty array when no countries match the region', () => {
      const result = filterByRegion(mockCountries, 'Africa');
      expect(result).toHaveLength(0);
    });
  });

  describe('sortCountries', () => {
    it('sorts countries by name in ascending order', () => {
      const result = sortCountries(mockCountries, 'name', 'asc');
      expect(result[0].name.common).toBe('Brazil');
      expect(result[1].name.common).toBe('Finland');
      expect(result[2].name.common).toBe('Japan');
    });

    it('sorts countries by name in descending order', () => {
      const result = sortCountries(mockCountries, 'name', 'desc');
      expect(result[0].name.common).toBe('Japan');
      expect(result[1].name.common).toBe('Finland');
      expect(result[2].name.common).toBe('Brazil');
    });

    it('sorts countries by population in ascending order', () => {
      const result = sortCountries(mockCountries, 'population', 'asc');
      expect(result[0].name.common).toBe('Finland');
      expect(result[1].name.common).toBe('Japan');
      expect(result[2].name.common).toBe('Brazil');
    });

    it('sorts countries by population in descending order', () => {
      const result = sortCountries(mockCountries, 'population', 'desc');
      expect(result[0].name.common).toBe('Brazil');
      expect(result[1].name.common).toBe('Japan');
      expect(result[2].name.common).toBe('Finland');
    });
  });

  describe('applyFilters', () => {
    it('applies all filters correctly', () => {
      const filters = {
        searchQuery: 'a',
        selectedRegion: 'Asia',
        sortField: 'name' as const,
        sortDirection: 'asc' as const,
      };

      const result = applyFilters(mockCountries, filters);
      expect(result).toHaveLength(1);
      expect(result[0].name.common).toBe('Japan');
    });

    it('returns all countries when no filters are applied', () => {
      const filters = {
        searchQuery: '',
        selectedRegion: 'All',
        sortField: 'name' as const,
        sortDirection: 'asc' as const,
      };

      const result = applyFilters(mockCountries, filters);
      expect(result).toHaveLength(3);
      expect(result[0].name.common).toBe('Brazil');
      expect(result[1].name.common).toBe('Finland');
      expect(result[2].name.common).toBe('Japan');
    });

    it('applies search and sort correctly', () => {
      const filters = {
        searchQuery: 'republic',
        selectedRegion: 'All',
        sortField: 'population' as const,
        sortDirection: 'desc' as const,
      };

      const result = applyFilters(mockCountries, filters);
      expect(result).toHaveLength(2);
      expect(result[0].name.common).toBe('Brazil');
      expect(result[1].name.common).toBe('Finland');
    });
  });
});
function filterByRegion(mockCountries: Country[], region: string): Country[] {
    if (region === 'All') {
        return mockCountries;
    }
    return mockCountries.filter(country => country.region === region);
}

function sortCountries(mockCountries: Country[], sortField: keyof Country, sortDirection: 'asc' | 'desc'): Country[] {
    return [...mockCountries].sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];

        if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

function applyFilters(
  mockCountries: Country[],
  filters: { searchQuery: string; selectedRegion: string; sortField: "name" | "population"; sortDirection: "asc" | "desc" }
): Country[] {
  let filteredCountries = mockCountries;

  if (filters.searchQuery) {
    filteredCountries = filterBySearch(filteredCountries, filters.searchQuery);
  }

  if (filters.selectedRegion !== 'All') {
    filteredCountries = filterByRegion(filteredCountries, filters.selectedRegion);
  }

  return sortCountries(filteredCountries, filters.sortField, filters.sortDirection);
}

