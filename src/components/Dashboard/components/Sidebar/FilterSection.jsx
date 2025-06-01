import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const FilterSection = ({ currentView, setCurrentView }) => {
  const { state } = useDashboard();
  const { tasks } = state;

  const getFilterCounts = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      inbox: tasks.filter(t => !t.completed && !t.dueDate).length,
      today: tasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = new Date(t.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === today.getTime();
      }).length,
      upcoming: tasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate > today;
      }).length,
      overdue: tasks.filter(t => {
        if (!t.dueDate || t.completed) return false;
        const dueDate = new Date(t.dueDate);
        return dueDate < today;
      }).length,
      completed: tasks.filter(t => t.completed).length,
      high: tasks.filter(t => !t.completed && t.priority === 'high').length,
      medium: tasks.filter(t => !t.completed && t.priority === 'medium').length,
      low: tasks.filter(t => !t.completed && t.priority === 'low').length,
      work: tasks.filter(t => !t.completed && (t.project === 'Work Projects' || t.category === 'work')).length,
      personal: tasks.filter(t => !t.completed && (t.project === 'Personal' || t.category === 'personal')).length,
      learning: tasks.filter(t => !t.completed && (t.project === 'Learning' || t.category === 'learning')).length,
      health: tasks.filter(t => !t.completed && t.category === 'health').length,
    };
  };

  const counts = getFilterCounts();

  const mainFilters = [
    {
      id: 'inbox',
      label: 'Inbox',
      icon: '📥',
      count: counts.inbox,
      description: 'Tasks without due dates'
    },
    {
      id: 'today',
      label: 'Today',
      icon: '📅',
      count: counts.today,
      description: 'Tasks due today'
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: '📆',
      count: counts.upcoming,
      description: 'Future tasks'
    },
    {
      id: 'overdue',
      label: 'Overdue',
      icon: '⚠️',
      count: counts.overdue,
      description: 'Past due tasks',
      priority: counts.overdue > 0
    }
  ];

  const priorityFilters = [
    { id: 'high', label: 'High Priority', icon: '🔴', count: counts.high },
    { id: 'medium', label: 'Medium Priority', icon: '🟡', count: counts.medium },
    { id: 'low', label: 'Low Priority', icon: '🟢', count: counts.low }
  ];

  const projectFilters = [
    { id: 'work', label: 'Work', icon: '💼', count: counts.work, color: '#3b82f6' },
    { id: 'personal', label: 'Personal', icon: '🏠', count: counts.personal, color: '#10b981' },
    { id: 'learning', label: 'Learning', icon: '📚', count: counts.learning, color: '#f59e0b' },
    { id: 'health', label: 'Health', icon: '💪', count: counts.health, color: '#ef4444' }
  ];

  const statusFilters = [
    { id: 'completed', label: 'Completed', icon: '✅', count: counts.completed },
    { id: 'all', label: 'All Tasks', icon: '📋', count: tasks.length }
  ];

  return (
    <div className="filter-sections">
      {/* Main Views */}
      <div className="nav-section">
        <h3 className="nav-section-title">Views</h3>
        <ul className="nav-list">
          {mainFilters.map(filter => (
            <li key={filter.id} className="nav-item">
              <button
                className={`nav-link ${currentView === filter.id ? 'active' : ''}`}
                onClick={() => setCurrentView(filter.id)}
                title={filter.description}
              >
                <span className="nav-icon">{filter.icon}</span>
                <span className="nav-text">{filter.label}</span>
                {filter.count > 0 && (
                  <span className={`nav-count ${filter.priority ? 'high-priority' : ''}`}>
                    {filter.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Priority Filters */}
      <div className="nav-section">
        <h3 className="nav-section-title">Priority</h3>
        <ul className="nav-list">
          {priorityFilters.map(filter => (
            <li key={filter.id} className="nav-item">
              <button
                className={`nav-link ${currentView === filter.id ? 'active' : ''}`}
                onClick={() => setCurrentView(filter.id)}
              >
                <span className="nav-icon">{filter.icon}</span>
                <span className="nav-text">{filter.label}</span>
                {filter.count > 0 && (
                  <span className="nav-count">{filter.count}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Project Labels */}
      <div className="nav-section">
        <ul className="labels-list">
          {projectFilters.map(project => (
            <li key={project.id} className="label-item">
              <button
                className={`label-link ${currentView === project.id ? 'active' : ''}`}
                onClick={() => setCurrentView(project.id)}
              >
                <span className="label-color" style={{ backgroundColor: project.color }}></span>
                <span className="label-name">{project.label}</span>
                {project.count > 0 && (
                  <span className="label-count">{project.count}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Status Filters */}
      <div className="nav-section">
        <h3 className="nav-section-title">Status</h3>
        <ul className="nav-list">
          {statusFilters.map(filter => (
            <li key={filter.id} className="nav-item">
              <button
                className={`nav-link ${currentView === filter.id ? 'active' : ''}`}
                onClick={() => setCurrentView(filter.id)}
              >
                <span className="nav-icon">{filter.icon}</span>
                <span className="nav-text">{filter.label}</span>
                <span className="nav-count">{filter.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSection;
