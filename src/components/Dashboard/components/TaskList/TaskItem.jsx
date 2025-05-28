import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      onUpdate({ title: editedTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#f59e0b';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const isOverdue = date < today && !task.completed;
    
    return {
      formatted: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      }),
      isOverdue
    };
  };

  const dueDate = formatDate(task.dueDate);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="checkbox-input"
        />
      </div>

      <div className="task-content">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleSave}
            className="task-edit-input"
            autoFocus
          />
        ) : (
          <div 
            className="task-title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.title}
          </div>
        )}

        <div className="task-meta">
          <span 
            className="task-priority"
            style={{ color: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
          
          {dueDate && (
            <span className={`task-due-date ${dueDate.isOverdue ? 'overdue' : ''}`}>
              {dueDate.formatted}
            </span>
          )}
          
          {task.description && (
            <span className="task-description">
              {task.description}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="action-btn edit-btn"
          title="Edit task"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="action-btn delete-btn"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
