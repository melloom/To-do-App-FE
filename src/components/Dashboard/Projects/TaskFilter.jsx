import React from 'react';

const TaskFilter = ({ onFilterChange, currentFilter = 'all' }) => {
  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => onFilterChange && onFilterChange(filter.value)}
            style={{
              padding: '6px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              background: currentFilter === filter.value ? '#6366f1' : '#ffffff',
              color: currentFilter === filter.value ? '#ffffff' : '#374151',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
