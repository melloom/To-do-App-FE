import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './SearchBar.css';

const SearchBar = () => {
  const { state, dispatch } = useDashboard();
  const [searchValue, setSearchValue] = useState(state.filters.search || '');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      dispatch({
        type: 'SET_FILTER',
        payload: { key: 'search', value }
      });
    }, 300);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    dispatch({
      type: 'SET_FILTER',
      payload: { key: 'search', value: '' }
    });
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchValue}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchValue && (
          <button 
            className="search-clear"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
