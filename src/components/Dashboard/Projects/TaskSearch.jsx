import React from 'react';

const TaskSearch = ({ onSearch, searchTerm = '' }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        placeholder="Search tasks..."
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          boxSizing: 'border-box',
          background: '#ffffff'
        }}
      />
    </div>
  );
};

export default TaskSearch;
