import React, { useState } from 'react';
import './CompletedSection.css';

const CompletedSection = () => {
  const [completedTasks] = useState([
    {
      id: 1,
      title: 'Complete project documentation',
      category: 'Work',
      completedDate: '2023-12-01',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Review team code submissions',
      category: 'Work',
      completedDate: '2023-11-30',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Grocery shopping',
      category: 'Personal',
      completedDate: '2023-11-29',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Update portfolio website',
      category: 'Personal',
      completedDate: '2023-11-28',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Attend client meeting',
      category: 'Work',
      completedDate: '2023-11-27',
      priority: 'high'
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffd93d';
      case 'low': return '#6bcf7f';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="completed-section">
      <div className="section-header">
        <h2>Completed Tasks</h2>
        <span className="task-count">{completedTasks.length} tasks completed</span>
      </div>

      <div className="completed-tasks-list">
        {completedTasks.map(task => (
          <div key={task.id} className="completed-task-item">
            <div className="task-checkbox">
              <span className="checkmark">✓</span>
            </div>
            
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              <div className="task-details">
                <span className="task-category">{task.category}</span>
                <span 
                  className="task-priority"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
                <span className="completion-date">
                  Completed on {formatDate(task.completedDate)}
                </span>
              </div>
            </div>

            <div className="task-actions">
              <button className="action-btn archive-btn" title="Archive task">
                📁
              </button>
              <button className="action-btn delete-btn" title="Delete task">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {completedTasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">✅</div>
          <h3>No completed tasks yet</h3>
          <p>Completed tasks will appear here once you finish them.</p>
        </div>
      )}
    </div>
  );
};

export default CompletedSection;