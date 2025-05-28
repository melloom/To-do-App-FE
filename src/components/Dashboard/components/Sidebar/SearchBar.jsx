import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const SearchBar = () => {
  const { dispatch, state } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        const filteredTasks = state.tasks.filter(task => 
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (task.project && task.project.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (task.priority && task.priority.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setSearchResults(filteredTasks);
      } else {
        setSearchResults([]);
      }
      
      // Update search in context without filter dependencies
      dispatch({
        type: 'SET_SEARCH',
        payload: searchQuery
      });
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, dispatch, state.tasks]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleTaskClick = (task) => {
    dispatch({
      type: 'SELECT_TASK',
      payload: task
    });
    setIsFocused(false);
  };

  return (
    <div className="sidebar-search">
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        {/* Search Results Dropdown */}
        {isFocused && searchQuery && (
          <div className="search-results-dropdown">
            <div className="search-results-header">
              <span className="search-result-count">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {searchResults.length === 0 ? (
              <div className="no-search-results">
                <div className="no-results-icon">🔍</div>
                <div className="no-results-text">No tasks found</div>
                <div className="no-results-subtext">Try different keywords</div>
              </div>
            ) : (
              <div className="search-results-list">
                {searchResults.slice(0, 5).map(task => (
                  <button
                    key={task.id}
                    className="search-result-item"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="search-result-content">
                      <div className="search-result-title">{task.title}</div>
                      {task.project && (
                        <div className="search-result-meta">
                          <span className="search-result-project">{task.project}</span>
                          {task.priority && (
                            <span className={`search-result-priority ${task.priority}`}>
                              {task.priority}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className={`search-result-status ${task.completed ? 'completed' : 'pending'}`}>
                      {task.completed ? '✓' : '○'}
                    </div>
                  </button>
                ))}
                
                {searchResults.length > 5 && (
                  <div className="search-results-more">
                    +{searchResults.length - 5} more results
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
