import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './FilterPanel.css';

const FilterPanel = ({ onClose, isOpen }) => {
  const { state, setFilter, clearFilters } = useDashboard();
  const { filters, tasks, projects, labels } = state;
  const [localFilters, setLocalFilters] = useState(filters);

  const updateFilter = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
    setFilter(key, value);
  };

  const handleClearFilters = () => {
    clearFilters();
    setLocalFilters({
      search: '',
      priority: 'all',
      project: 'all',
      view: 'inbox',
      completed: false,
      label: 'all',
      dateRange: 'all'
    });
  };

  const applyFilters = () => {
    Object.entries(localFilters).forEach(([key, value]) => {
      setFilter(key, value);
    });
    onClose();
  };

  const getFilteredTasksCount = () => {
    let count = tasks.length;
    
    if (localFilters.priority !== 'all') {
      count = tasks.filter(task => task.priority === localFilters.priority).length;
    }
    
    if (localFilters.project !== 'all') {
      count = tasks.filter(task => task.project === localFilters.project).length;
    }
    
    if (localFilters.completed) {
      count = tasks.filter(task => task.completed).length;
    }
    
    return count;
  };

  if (!isOpen) return null;

  return (
    <div className="filter-panel-overlay" onClick={onClose}>
      <div className="filter-panel" onClick={e => e.stopPropagation()}>
        <div className="filter-header">
          <h3>🔍 Advanced Filters</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="filter-content">
          <div className="filter-section">
            <h4>Priority</h4>
            <div className="filter-options">
              {['all', 'high', 'medium', 'low'].map(priority => (
                <button
                  key={priority}
                  className={`filter-option ${localFilters.priority === priority ? 'active' : ''}`}
                  onClick={() => updateFilter('priority', priority)}
                >
                  {priority === 'high' && '🔴'}
                  {priority === 'medium' && '🟡'}
                  {priority === 'low' && '🟢'}
                  {priority === 'all' && '📋'}
                  <span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Project</h4>
            <div className="filter-options">
              <button
                className={`filter-option ${localFilters.project === 'all' ? 'active' : ''}`}
                onClick={() => updateFilter('project', 'all')}
              >
                All Projects
              </button>
              {projects.map(project => (
                <button
                  key={project.id}
                  className={`filter-option ${localFilters.project === project.name ? 'active' : ''}`}
                  onClick={() => updateFilter('project', project.name)}
                >
                  <div 
                    className="project-color"
                    style={{ backgroundColor: project.color }}
                  />
                  {project.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Status</h4>
            <div className="filter-options">
              <button
                className={`filter-option ${!localFilters.completed ? 'active' : ''}`}
                onClick={() => updateFilter('completed', false)}
              >
                📝 Active Tasks
              </button>
              <button
                className={`filter-option ${localFilters.completed ? 'active' : ''}`}
                onClick={() => updateFilter('completed', true)}
              >
                ✅ Completed Tasks
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h4>Labels</h4>
            <div className="filter-options">
              <button
                className={`filter-option ${localFilters.label === 'all' ? 'active' : ''}`}
                onClick={() => updateFilter('label', 'all')}
              >
                All Labels
              </button>
              {labels.map(label => (
                <button
                  key={label.id}
                  className={`filter-option ${localFilters.label === label.id ? 'active' : ''}`}
                  onClick={() => updateFilter('label', label.id)}
                >
                  <div 
                    className="label-color"
                    style={{ backgroundColor: label.color }}
                  />
                  {label.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Due Date</h4>
            <div className="filter-options">
              {[
                { key: 'all', label: 'All Dates', icon: '📅' },
                { key: 'overdue', label: 'Overdue', icon: '🔴' },
                { key: 'today', label: 'Due Today', icon: '⭐' },
                { key: 'this-week', label: 'This Week', icon: '📆' },
                { key: 'next-week', label: 'Next Week', icon: '🗓️' },
                { key: 'no-date', label: 'No Due Date', icon: '❓' }
              ].map(dateOption => (
                <button
                  key={dateOption.key}
                  className={`filter-option ${localFilters.dateRange === dateOption.key ? 'active' : ''}`}
                  onClick={() => updateFilter('dateRange', dateOption.key)}
                >
                  {dateOption.icon} {dateOption.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>View</h4>
            <div className="filter-options">
              {[
                { key: 'inbox', label: 'Inbox', icon: '📥' },
                { key: 'today', label: 'Today', icon: '📅' },
                { key: 'upcoming', label: 'Upcoming', icon: '🗓️' },
                { key: 'completed', label: 'Completed', icon: '✅' },
                { key: 'all', label: 'All Tasks', icon: '📋' }
              ].map(viewOption => (
                <button
                  key={viewOption.key}
                  className={`filter-option ${localFilters.view === viewOption.key ? 'active' : ''}`}
                  onClick={() => updateFilter('view', viewOption.key)}
                >
                  {viewOption.icon} {viewOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-footer">
          <div className="filter-stats">
            <span className="results-count">
              {getFilteredTasksCount()} task{getFilteredTasksCount() !== 1 ? 's' : ''} found
            </span>
          </div>
          
          <div className="filter-actions">
            <button className="clear-btn" onClick={handleClearFilters}>
              Clear All
            </button>
            <button className="apply-btn" onClick={applyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
