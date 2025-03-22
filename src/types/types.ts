export interface Country {
    name: {
      common: string;
      official: string;
    };
    population: number;
    region: string;
    flags: {
      png: string;
      svg: string;
      alt?: string;
    };
    cca3: string;
  }
  
  export type SortField = 'name' | 'population';
  export type SortDirection = 'asc' | 'desc';
  export type Region = 'All' | 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';
  
  export interface FilterState {
    searchQuery: string;
    selectedRegion: Region;
    sortField: SortField;
    sortDirection: SortDirection;
  }
  