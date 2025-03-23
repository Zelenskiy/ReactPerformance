import React, { useCallback } from 'react';
import { FilterState, Region, SortField, SortDirection } from '../types/types';

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (updatedFilters: Partial<FilterState>) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFilterChange,
}) => {
  const { searchQuery, selectedRegion, sortField, sortDirection } = filters;

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({ searchQuery: e.target.value });
    },
    [onFilterChange]
  );

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange({ selectedRegion: e.target.value as Region });
    },
    [onFilterChange]
  );

  const handleSortFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange({ sortField: e.target.value as SortField });
    },
    [onFilterChange]
  );

  const handleSortDirectionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange({ sortDirection: e.target.value as SortDirection });
    },
    [onFilterChange]
  );

  return (
    <div className="filter-controls">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filters-container">
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className="region-select"
        >
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

        <div className="sort-controls">
          <select
            value={sortField}
            onChange={handleSortFieldChange}
            className="sort-field-select"
          >
            <option value="name">Name</option>
            <option value="population">Population</option>
          </select>

          <select
            value={sortDirection}
            onChange={handleSortDirectionChange}
            className="sort-direction-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FilterControls);
