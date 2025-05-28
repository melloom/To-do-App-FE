import React from 'react';

const TaskItem = ({ task, onToggle, onSelect }) => {
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(task.id);
  };

  const handleClick = () => {
    onSelect(task);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else if (date < today) {
      return 'Overdue';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div 
      className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}
      onClick={handleClick}
    >
      <div className="task-checkbox-container">
        <button
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={handleToggle}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <span className="checkbox-check">✓</span>}
        </button>
      </div>

      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          {task.priority && (
            <div 
              className="priority-indicator"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
              title={`${task.priority} priority`}
            />
          )}
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          {task.dueDate && (
            <span className={`task-due ${formatDate(task.dueDate) === 'Overdue' ? 'overdue' : ''}`}>
              📅 {formatDate(task.dueDate)}
            </span>
          )}
          
          {task.project && (
            <span className="task-project">
              📂 {task.project}
            </span>
          )}
          
          {task.labels && task.labels.length > 0 && (
            <div className="task-labels">
              {task.labels.slice(0, 3).map(label => (
                <span key={label} className="task-label">
                  {label}
                </span>
              ))}
              {task.labels.length > 3 && (
                <span className="task-label-more">+{task.labels.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button 
          className="task-action-btn"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement edit functionality
            console.log('Edit task', task.id);
          }}
          title="Edit task"
        >
          ✏️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
