import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="task-checkbox"
        />
        <span className="task-title">{task.title}</span>
      </div>
      <div className="task-right">
        <span 
          className="task-priority"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority}
        </span>
        <button className="delete-btn" onClick={onDelete}>
          ×
        </button>
      </div>
    </div>
  );
};

export default TaskItem;