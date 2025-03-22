import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/test-utils';
import { mockCountries, mockFilterState } from '../test/mockData';
import CountryList from '../components/CountryList';

describe('CountryList', () => {
  const mockToggleVisited = vi.fn();
  const mockVisitedCountries = new Set<string>(['FIN']);

  it('renders a list of countries', () => {
    render(
      <CountryList
        countries={mockCountries}
        filters={mockFilterState}
        visitedCountries={mockVisitedCountries}
        onToggleVisited={mockToggleVisited}
      />
    );

    expect(screen.getByText('Finland')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('displays a message when no countries match the filters', () => {
    const noMatchFilters = {
      ...mockFilterState,
      searchQuery: 'nonexistentcountry',
    };

    render(
      <CountryList
        countries={mockCountries}
        filters={noMatchFilters}
        visitedCountries={mockVisitedCountries}
        onToggleVisited={mockToggleVisited}
      />
    );

    expect(screen.getByText('No countries found matching your criteria.')).toBeInTheDocument();
  });

  it('correctly marks visited countries', () => {
    render(
      <CountryList
        countries={mockCountries}
        filters={mockFilterState}
        visitedCountries={mockVisitedCountries}
        onToggleVisited={mockToggleVisited}
      />
    );

    expect(screen.getByText('Visited')).toBeInTheDocument();
    expect(screen.getAllByText('Visited').length).toBe(1);
  });

  it('passes the correct props to CountryCard components', () => {
    render(
      <CountryList
        countries={mockCountries}
        filters={mockFilterState}
        visitedCountries={mockVisitedCountries}
        onToggleVisited={mockToggleVisited}
      />
    );

    mockCountries.forEach(country => {
      expect(screen.getByText(country.name.common)).toBeInTheDocument();
      expect(screen.getByText(`Population: ${country.population.toLocaleString()}`)).toBeInTheDocument();
      expect(screen.getByText(`Region: ${country.region}`)).toBeInTheDocument();
    });

    const visitedBadges = screen.getAllByText('Visited');
    expect(visitedBadges.length).toBe(1);
  });
});
