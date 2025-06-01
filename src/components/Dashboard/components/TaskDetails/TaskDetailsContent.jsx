import React from 'react';
import SubtasksList from './SubtasksList';

const TaskDetailsContent = ({ task, isEditing, onUpdate }) => {
  const handleFieldUpdate = (field, value) => {
    onUpdate({ ...task, [field]: value });
  };

  return (
    <div className="task-details-content">
      <div className="detail-section">
        <label className="detail-label">Title</label>
        {isEditing ? (
          <input
            type="text"
            value={task.title}
            onChange={(e) => handleFieldUpdate('title', e.target.value)}
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
            value={task.description || ''}
            onChange={(e) => handleFieldUpdate('description', e.target.value)}
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
              value={task.dueDate || ''}
              onChange={(e) => handleFieldUpdate('dueDate', e.target.value)}
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
              value={task.priority}
              onChange={(e) => handleFieldUpdate('priority', e.target.value)}
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
            value={task.project || ''}
            onChange={(e) => handleFieldUpdate('project', e.target.value)}
            className="detail-select"
          >
            <option value="">No project</option>
            <option value="Work Projects">Work Projects</option>
            <option value="Personal">Personal</option>
            <option value="Learning">Learning</option>
          </select>
        ) : (
          <div className="detail-value">{task.project || 'No project'}</div>
        )}
      </div>

      <div className="detail-section">
        <label className="detail-label">Labels</label>
        <div className="task-labels">
          {task.labels && task.labels.length > 0 ? (
            task.labels.map(label => (
              <span key={label} className="task-label-tag">
                {label}
                {isEditing && <button className="remove-label">×</button>}
              </span>
            ))
          ) : (
            <div className="detail-value">No labels</div>
          )}
        </div>
      </div>

      <SubtasksList 
        subtasks={task.subtasks || []}
        isEditing={isEditing}
        onUpdate={(subtasks) => handleFieldUpdate('subtasks', subtasks)}
      />

      <div className="detail-section">
        <label className="detail-label">Activity</label>
        <div className="task-activity">
          <div className="activity-item">
            <span className="activity-time">2 hours ago</span>
            <span className="activity-text">Task created</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">1 hour ago</span>
            <span className="activity-text">Added to "Work Projects"</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsContent;
