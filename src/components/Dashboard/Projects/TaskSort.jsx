import React from 'react';

const TaskSort = ({ onSort, currentSort = 'created' }) => {
  const sortOptions = [
    { value: 'created', label: 'Date Created' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'completed', label: 'Status' }
  ];

  return (
    <div style={{ marginBottom: '16px' }}>
      <select
        value={currentSort}
        onChange={(e) => onSort && onSort(e.target.value)}
        style={{
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          background: '#ffffff',
          cursor: 'pointer'
        }}
      >
        <option value="">Sort by...</option>
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskSort;
