import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="container">
        <h1>Country Explorer</h1>
        <p>Click on a country to mark it as visited</p>
      </div>
    </header>
  );
};

export default React.memo(Header);
