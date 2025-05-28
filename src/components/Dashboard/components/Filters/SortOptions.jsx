import React from 'react';

const SortOptions = ({ currentSort, onSortChange }) => {
  const sortOptions = [
    { id: 'dueDate', label: 'Due Date', icon: '📅' },
    { id: 'priority', label: 'Priority', icon: '🔥' },
    { id: 'title', label: 'Title', icon: '🔤' },
    { id: 'created', label: 'Date Created', icon: '📆' },
    { id: 'project', label: 'Project', icon: '📂' }
  ];

  return (
    <div className="sort-options">
      <h4 className="sort-title">Sort by</h4>
      <div className="sort-buttons">
        {sortOptions.map(option => (
          <button
            key={option.id}
            className={`sort-option ${currentSort === option.id ? 'active' : ''}`}
            onClick={() => onSortChange(option.id)}
          >
            <span className="sort-icon">{option.icon}</span>
            <span className="sort-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortOptions;
