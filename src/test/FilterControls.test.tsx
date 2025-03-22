import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import { mockFilterState } from '../test/mockData';
import FilterControls from '../components/FilterControls';
import { Region } from '../types/types';

describe('FilterControls', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders all filter controls', () => {
    render(
      <FilterControls
        filters={mockFilterState}
        onFilterChange={mockOnFilterChange}
      />
    );

    expect(
      screen.getByPlaceholderText('Search for a country...')
    ).toBeInTheDocument();
    expect(screen.getByText('All Regions')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
    expect(screen.getByText('Ascending')).toBeInTheDocument();
    expect(screen.getByText('Descending')).toBeInTheDocument();
  });

  it('calls onFilterChange with updated searchQuery when search input changes', () => {
    render(
      <FilterControls
        filters={mockFilterState}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: 'finland' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({ searchQuery: 'finland' });
  });

  it('calls onFilterChange with updated selectedRegion when region select changes', () => {
    render(
      <FilterControls
        filters={mockFilterState}
        onFilterChange={mockOnFilterChange}
      />
    );

    const selects = screen.getAllByRole('combobox');
    const regionSelect2 = selects[0];

    fireEvent.change(regionSelect2, { target: { value: 'Europe' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      selectedRegion: 'Europe',
    });
  });

  it('calls onFilterChange with updated sortField when sort field select changes', () => {
    render(
      <FilterControls
        filters={mockFilterState}
        onFilterChange={mockOnFilterChange}
      />
    );

    const selects = screen.getAllByRole('combobox');
    const sortFieldSelect = selects[1];

    fireEvent.change(sortFieldSelect, { target: { value: 'population' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      sortField: 'population',
    });
  });

  it('calls onFilterChange with updated sortDirection when sort direction select changes', () => {
    render(
      <FilterControls
        filters={mockFilterState}
        onFilterChange={mockOnFilterChange}
      />
    );

    const selects = screen.getAllByRole('combobox');
    const sortDirectionSelect = selects[2];

    fireEvent.change(sortDirectionSelect, { target: { value: 'desc' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({ sortDirection: 'desc' });
  });

  it('displays the current filter values', () => {
    const customFilters = {
      searchQuery: 'test',
      selectedRegion: 'Europe' as Region,
      sortField: 'population' as const,
      sortDirection: 'desc' as const,
    };

    render(
      <FilterControls
        filters={customFilters}
        onFilterChange={mockOnFilterChange}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search for a country...');
    expect(searchInput).toHaveValue('test');
  });
});
