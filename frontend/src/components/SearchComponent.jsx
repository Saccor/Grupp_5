import React, { useState } from 'react';

const SearchComponent = ({ onSearch, hasResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        type="text"
        placeholder="Sök..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '100%',
          padding: '10px',
          border: '0.1em solid',
          borderRadius: '15px',
        }}
      />
      {searchTerm && !hasResults && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 5px)',
            left: 0,
            width: '100%',
            backgroundColor: 'white',
            border: '1px solid gray',
            borderRadius: '5px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            zIndex: 1,
            animation: 'slideIn 0.3s forwards',
            color: 'red',
          }}
        >
          Ingen sökträff
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
