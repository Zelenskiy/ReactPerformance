import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import '@testing-library/jest-dom';

import { mockCountries } from '../test/mockData';
import CountryCard from '../components/CountryCard';

describe('CountryCard', () => {
  const mockCountry = mockCountries[0]; // Finland
  const mockToggleVisited = vi.fn();

  it('renders country information correctly', () => {
    render(
      <CountryCard
        country={mockCountry}
        isVisited={false}
        onToggleVisited={mockToggleVisited}
      />
    );

    expect(screen.getByText('Finland')).toBeInTheDocument();

    expect(screen.getByText(/Population:/)).toHaveTextContent(
      'Population: 5,530,719'
    );

    expect(screen.getByText(/Region:/)).toHaveTextContent('Region: Europe');

    const flagImage = screen.getByAltText(/Flag of Finland/);
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', mockCountry.flags.svg);
  });

  it('shows visited badge when country is visited', () => {
    render(
      <CountryCard
        country={mockCountry}
        isVisited={true}
        onToggleVisited={mockToggleVisited}
      />
    );

    expect(screen.getByText('Visited')).toBeInTheDocument();
  });

  it('does not show visited badge when country is not visited', () => {
    render(
      <CountryCard
        country={mockCountry}
        isVisited={false}
        onToggleVisited={mockToggleVisited}
      />
    );

    expect(screen.queryByText('Visited')).not.toBeInTheDocument();
  });

  it('calls onToggleVisited with the correct country code when clicked', () => {
    render(
      <CountryCard
        country={mockCountry}
        isVisited={false}
        onToggleVisited={mockToggleVisited}
      />
    );

    fireEvent.click(screen.getByText('Finland'));
    expect(mockToggleVisited).toHaveBeenCalledWith(mockCountry.cca3);
  });

  it('has the "visited" class when country is visited', () => {
    const { container } = render(
      <CountryCard
        country={mockCountry}
        isVisited={true}
        onToggleVisited={mockToggleVisited}
      />
    );

    expect(container.firstChild).toHaveClass('visited');
  });

  it('does not have the "visited" class when country is not visited', () => {
    const { container } = render(
      <CountryCard
        country={mockCountry}
        isVisited={false}
        onToggleVisited={mockToggleVisited}
      />
    );

    expect(container.firstChild).not.toHaveClass('visited');
  });
});
