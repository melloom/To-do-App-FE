
import React from 'react';

const TaskDetailsActions = ({ task, isEditing, onSave, onCancel }) => {
  if (isEditing) {
    return (
      <div className="task-details-actions editing">
        <button className="save-btn" onClick={onSave}>
          Save Changes
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="task-details-actions">
      <button className="action-btn duplicate-btn">
        <span className="btn-icon">📋</span>
        Duplicate
      </button>
      
      <button className="action-btn move-btn">
        <span className="btn-icon">📁</span>
        Move to Project
      </button>
      
      <button className="action-btn archive-btn">
        <span className="btn-icon">📦</span>
        Archive
      </button>
      
      <button className="action-btn delete-btn">
        <span className="btn-icon">🗑️</span>
        Delete
      </button>
    </div>
  );
};

export default TaskDetailsActions;