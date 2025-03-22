import { Country } from '../types/types';
  
const API_URL = 'https://restcountries.com/v3.1/all';

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data as Country[];
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
