import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import './UpcomingSection.css';

const UpcomingSection = () => {
  const { state } = useDashboard();
  const { tasks = [] } = state || {};
  const [filter, setFilter] = useState('all');

  // Filter tasks for upcoming (future dates)
  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today
  const upcomingTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const dueDate = new Date(task.dueDate);
    return dueDate > today;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  const filteredTasks = filter === 'all' 
    ? upcomingTasks 
    : upcomingTasks.filter(task => task.category === filter);
  const groupTasksByDate = (tasks) => {
    const groups = {};
    tasks.forEach(task => {
      const dateKey = task.dueDate;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(task);
    });
    return groups;
  };

  const groupedTasks = groupTasksByDate(filteredTasks);

  return (
    <div className="upcoming-section">
      <div className="section-header">
        <h2>Upcoming</h2>
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({upcomingTasks.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'work' ? 'active' : ''}`}
            onClick={() => setFilter('work')}
          >
            Work ({upcomingTasks.filter(t => t.category === 'work').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'personal' ? 'active' : ''}`}
            onClick={() => setFilter('personal')}
          >
            Personal ({upcomingTasks.filter(t => t.category === 'personal').length})
          </button>
        </div>
      </div>

      <div className="upcoming-tasks">
        {Object.entries(groupedTasks).map(([date, tasks]) => (
          <div key={date} className="date-group">
            <div className="date-header">
              <span className="date-label">{formatDate(date)}</span>
              <span className="date-full">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="date-tasks">
              {tasks.map(task => (
                <div key={task.id} className="upcoming-task">
                  <div className="task-info">
                    <span className="task-title">{task.title}</span>
                    <div className="task-meta">
                      <span className={`task-category category-${task.category}`}>
                        {task.category}
                      </span>
                      <span className={`task-priority priority-${task.priority}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="reschedule-btn">Reschedule</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="empty-state">
          <p>No upcoming tasks found. You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingSection;