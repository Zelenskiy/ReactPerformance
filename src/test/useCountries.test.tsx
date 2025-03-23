import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { fetchCountries } from '../api/countriesApi';
import { mockCountries } from '../test/mockData';

vi.mock('../api/countriesApi', () => ({
  fetchCountries: vi.fn(),
}));

describe('useCountries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with loading state and empty countries array', () => {
    const { result } = renderHook(() => useCountries());

    expect(result.current.loading).toBe(true);
    expect(result.current.countries).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('fetches countries and updates state on successful fetch', async () => {
    (fetchCountries as Mock).mockResolvedValueOnce(mockCountries);

    const { result } = renderHook(() => useCountries());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetchCountries).toHaveBeenCalledTimes(1);
    expect(result.current.countries).toEqual(mockCountries);
    expect(result.current.error).toBeNull();
  });

  it('sets error state on failed fetch', async () => {
    (fetchCountries as Mock).mockRejectedValueOnce(
      new Error('Failed to fetch')
    );

    const { result } = renderHook(() => useCountries());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetchCountries).toHaveBeenCalledTimes(1);
    expect(result.current.countries).toEqual([]);
    expect(result.current.error).toBe(
      'Failed to fetch countries. Please try again later.'
    );
  });
});

import { act } from '@testing-library/react';
import { useVisitedCountries } from '../hooks/useVisitedCountries';
import { useCountries } from '../hooks/useCountries';

describe('useVisitedCountries', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with empty set if no visited countries in localStorage', () => {
    const { result } = renderHook(() => useVisitedCountries());

    expect(result.current.visitedCountries.size).toBe(0);
    expect(localStorage.getItem).toHaveBeenCalledWith('visitedCountries');
  });

  it('loads visited countries from localStorage', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValueOnce(
      JSON.stringify(['FIN', 'BRA'])
    );

    const { result } = renderHook(() => useVisitedCountries());

    expect(result.current.visitedCountries.size).toBe(2);
    expect(result.current.visitedCountries.has('FIN')).toBe(true);
    expect(result.current.visitedCountries.has('BRA')).toBe(true);
  });

  it('toggles a country as visited', () => {
    const { result } = renderHook(() => useVisitedCountries());

    act(() => {
      result.current.toggleCountryVisited('FIN');
    });

    expect(result.current.visitedCountries.has('FIN')).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'visitedCountries',
      JSON.stringify(['FIN'])
    );

    act(() => {
      result.current.toggleCountryVisited('FIN');
    });

    expect(result.current.visitedCountries.has('FIN')).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'visitedCountries',
      JSON.stringify([])
    );
  });

  it('provides an isVisited function that checks if a country is visited', () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValueOnce(
      JSON.stringify(['FIN'])
    );

    const { result } = renderHook(() => useVisitedCountries());

    expect(result.current.isVisited('FIN')).toBe(true);
    expect(result.current.isVisited('BRA')).toBe(false);
  });

  it('updates localStorage when visitedCountries changes', () => {
    const { result } = renderHook(() => useVisitedCountries());

    act(() => {
      result.current.toggleCountryVisited('FIN');
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'visitedCountries',
      JSON.stringify(['FIN'])
    );

    act(() => {
      result.current.toggleCountryVisited('BRA');
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'visitedCountries',
      JSON.stringify(['FIN', 'BRA'])
    );
  });
});
