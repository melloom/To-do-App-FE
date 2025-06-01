import React from 'react';

const TaskDetailsHeader = ({ task, onClose, isEditing, setIsEditing }) => {
  return (
    <div className="task-details-header">
      <div className="header-left">
        <h2 className="task-details-title">Task Details</h2>
      </div>
      
      <div className="header-actions">
        <button 
          className={`edit-btn ${isEditing ? 'active' : ''}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? '📝' : '✏️'}
        </button>
        
        <button className="share-btn" title="Share task">
          🔗
        </button>
        
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsHeader;
