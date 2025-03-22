import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { mockCountries } from '../test/mockData';
import { fetchCountries } from '../api/countriesApi';

describe('countriesApi', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it('fetches countries successfully', async () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCountries,
    });

    const result = await fetchCountries();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://restcountries.com/v3.1/all'
    );
    expect(result).toEqual(mockCountries);
  });

  it('throws an error when the fetch fails', async () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchCountries()).rejects.toThrow('Error: 404');
  });

  it('throws an error when the fetch throws an error', async () => {
    (globalThis.fetch as Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    await expect(fetchCountries()).rejects.toThrow();
  });
});
