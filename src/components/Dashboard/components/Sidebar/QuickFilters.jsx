import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const QuickFilters = ({ currentView, setCurrentView }) => {
  const { state, dispatch } = useDashboard();
  const { tasks } = state;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleFilterClick = (filterId) => {
    dispatch({
      type: 'SET_ACTIVE_VIEW',
      payload: filterId
    });
  };

  const quickFilters = [
    {
      id: 'urgent',
      label: 'Urgent',
      icon: '🔥',
      count: tasks.filter(t => !t.completed && t.priority === 'high').length,
      className: 'urgent'
    },
    {
      id: 'today',
      label: 'Due Today',
      icon: '📅',
      count: tasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = new Date(t.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === today.getTime();
      }).length,
      className: 'today'
    },
    {
      id: 'overdue',
      label: 'Overdue',
      icon: '⚠️',
      count: tasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate < today;
      }).length,
      className: 'overdue'
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: '✅',
      count: tasks.filter(t => t.completed).length,
      className: 'completed'
    }
  ];

  return (
    <div className="quick-filters">
      <div className="quick-filters-title">Quick Filters</div>
      <div className="filter-buttons">
        {quickFilters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${filter.className} ${currentView === filter.id ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter.id)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
            {filter.count > 0 && (
              <span className="filter-count">{filter.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickFilters;
