import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ task, onEdit, onDelete, onComplete }) => {
  const [actionsVisible, setActionsVisible] = useState(false);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };
  
  const getCategoryColor = (category) => {
    const colors = {
      work: '#4f46e5',
      personal: '#16a34a',
      shopping: '#ea580c',
      health: '#dc2626',
      education: '#9333ea'
    };
    
    return colors[category] || '#6b7280';
  };
  
  return (
    <div 
      className={`task-item ${task.completed ? 'completed' : ''}`}
      onMouseEnter={() => setActionsVisible(true)}
      onMouseLeave={() => setActionsVisible(false)}
    >
      <div className="task-checkbox-column">
        <div 
          className={`task-checkbox ${task.completed ? 'completed' : ''}`}
          onClick={onComplete}
        >
          {task.completed && <i className="fa-solid fa-check"></i>}
        </div>
      </div>
      
      <div className="task-title-column">
        <div className="task-title-wrapper">
          <div className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </div>
          {task.description && (
            <div className="task-description">
              {task.description}
            </div>
          )}
        </div>
      </div>
      
      <div className="task-date-column">
        <div className={`task-date ${isDateSoon(task.dueDate) ? 'soon' : ''}`}>
          <i className="fa-regular fa-calendar"></i>
          <span>{formatDate(task.dueDate)}</span>
        </div>
      </div>
      
      <div className="task-category-column">
        <div 
          className="task-category"
          style={{ backgroundColor: getCategoryColor(task.category) + '20',
                  color: getCategoryColor(task.category) }}
        >
          {task.category}
        </div>
      </div>
      
      <div className="task-priority-column">
        <div className={`task-priority ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </div>
      </div>
      
      <div className="task-actions-column">
        <div className={`task-actions ${actionsVisible ? 'visible' : ''}`}>
          <button 
            className="task-action-btn edit"
            onClick={onEdit}
          >
            <i className="fa-solid fa-pen"></i>
          </button>
          <button 
            className="task-action-btn delete"
            onClick={onDelete}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to check if date is within the next 3 days
const isDateSoon = (dateString) => {
  const today = new Date();
  const dueDate = new Date(dateString);
  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays >= 0 && diffDays <= 3;
};

export default TodoItem;