import { Country, FilterState } from '../types/types';

export const mockCountries: Country[] = [
  {
    name: {
      common: 'Finland',
      official: 'Republic of Finland',
    },
    population: 5530719,
    region: 'Europe',
    flags: {
      png: 'https://flagcdn.com/w320/fi.png',
      svg: 'https://flagcdn.com/fi.svg',
      alt: 'The flag of Finland has a white field with a blue cross that extends to the edges of the field.',
    },
    cca3: 'FIN',
  },
  {
    name: {
      common: 'Brazil',
      official: 'Federative Republic of Brazil',
    },
    population: 212559417,
    region: 'Americas',
    flags: {
      png: 'https://flagcdn.com/w320/br.png',
      svg: 'https://flagcdn.com/br.svg',
      alt: 'The flag of Brazil has a green field with a large yellow rhombus in the center. Within the rhombus is a dark blue globe with twenty-seven small five-pointed white stars depicting a starry sky and a curved white band running across it.',
    },
    cca3: 'BRA',
  },
  {
    name: {
      common: 'Japan',
      official: 'Japan',
    },
    population: 125836021,
    region: 'Asia',
    flags: {
      png: 'https://flagcdn.com/w320/jp.png',
      svg: 'https://flagcdn.com/jp.svg',
      alt: 'The flag of Japan features a crimson-red circle at the center of a white field.',
    },
    cca3: 'JPN',
  },
];

export const mockFilterState: FilterState = {
  searchQuery: '',
  selectedRegion: 'All',
  sortField: 'name',
  sortDirection: 'asc',
};
