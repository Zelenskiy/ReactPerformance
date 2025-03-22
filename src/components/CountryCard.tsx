import React from 'react';
import { Country } from '../types/types';

interface CountryCardProps {
  country: Country;
  isVisited: boolean;
  onToggleVisited: (countryCode: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ 
  country, 
  isVisited, 
  onToggleVisited 
}) => {
  const handleToggleVisited = () => {
    onToggleVisited(country.cca3);
  };

  return (
    <div 
      className={`country-card ${isVisited ? 'visited' : ''}`}
      onClick={handleToggleVisited}
    >
      <div className="country-flag">
        <img src={country.flags.svg} alt={country.flags.alt || `Flag of ${country.name.common}`} />
      </div>
      <div className="country-info">
        <h2>{country.name.common}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        {isVisited && <div className="visited-badge">Visited</div>}
      </div>
    </div>
  );
};

export default React.memo(CountryCard, (prevProps, nextProps) => {
  return (
    prevProps.country.cca3 === nextProps.country.cca3 &&
    prevProps.isVisited === nextProps.isVisited
  );
});