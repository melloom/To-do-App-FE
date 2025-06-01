import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './TaskDetails.css';

const TaskDetails = ({ task, onClose }) => {
  const { dispatch } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: { id: task.id, updates: editedTask }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({
        type: 'DELETE_TASK',
        payload: task.id
      });
      onClose();
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="task-details-panel">
      <div className="task-details-header">
        <h3>Task Details</h3>
        <div className="task-details-actions">
          {!isEditing ? (
            <>
              <button 
                className="action-btn edit"
                onClick={() => setIsEditing(true)}
                title="Edit task"
              >
                ✏️
              </button>
              <button 
                className="action-btn delete"
                onClick={handleDelete}
                title="Delete task"
              >
                🗑️
              </button>
            </>
          ) : (
            <>
              <button 
                className="action-btn save"
                onClick={handleSave}
                title="Save changes"
              >
                ✅
              </button>
              <button 
                className="action-btn cancel"
                onClick={handleCancel}
                title="Cancel editing"
              >
                ❌
              </button>
            </>
          )}
          <button 
            className="action-btn close"
            onClick={onClose}
            title="Close panel"
          >
            ×
          </button>
        </div>
      </div>

      <div className="task-details-content">
        <div className="detail-section">
          <label className="detail-label">Title</label>
          {isEditing ? (
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="detail-input"
            />
          ) : (
            <div className="detail-value">{task.title}</div>
          )}
        </div>

        <div className="detail-section">
          <label className="detail-label">Description</label>
          {isEditing ? (
            <textarea
              value={editedTask.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="detail-textarea"
              rows="3"
            />
          ) : (
            <div className="detail-value">
              {task.description || 'No description'}
            </div>
          )}
        </div>

        <div className="detail-row">
          <div className="detail-section">
            <label className="detail-label">Due Date</label>
            {isEditing ? (
              <input
                type="date"
                value={editedTask.dueDate || ''}
                onChange={(e) => handleFieldChange('dueDate', e.target.value)}
                className="detail-input"
              />
            ) : (
              <div className="detail-value">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
              </div>
            )}
          </div>

          <div className="detail-section">
            <label className="detail-label">Priority</label>
            {isEditing ? (
              <select
                value={editedTask.priority}
                onChange={(e) => handleFieldChange('priority', e.target.value)}
                className="detail-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            ) : (
              <div className={`detail-value priority-${task.priority}`}>
                {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}
              </div>
            )}
          </div>
        </div>

        <div className="detail-section">
          <label className="detail-label">Project</label>
          {isEditing ? (
            <select
              value={editedTask.project || ''}
              onChange={(e) => handleFieldChange('project', e.target.value)}
              className="detail-select"
            >
              <option value="">No project</option>
              <option value="Work Projects">Work Projects</option>
              <option value="Personal">Personal</option>
              <option value="Learning">Learning</option>
              <option value="Health">Health</option>
            </select>
          ) : (
            <div className="detail-value">{task.project || 'No project'}</div>
          )}
        </div>

        <div className="detail-section">
          <label className="detail-label">Category</label>
          {isEditing ? (
            <select
              value={editedTask.category || ''}
              onChange={(e) => handleFieldChange('category', e.target.value)}
              className="detail-select"
            >
              <option value="">No category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="learning">Learning</option>
              <option value="health">Health</option>
            </select>
          ) : (
            <div className="detail-value">{task.category || 'No category'}</div>
          )}
        </div>

        <div className="detail-section">
          <label className="detail-label">Status</label>
          <div className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </div>
        </div>

        <div className="detail-section">
          <label className="detail-label">Created</label>
          <div className="detail-value">
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
