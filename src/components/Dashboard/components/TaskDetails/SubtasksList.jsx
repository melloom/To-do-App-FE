import React, { useState } from 'react';

const SubtasksList = ({ subtasks = [], onSubtaskUpdate, onSubtaskAdd, onSubtaskDelete }) => {
  const [newSubtask, setNewSubtask] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      onSubtaskAdd?.({
        id: Date.now(),
        title: newSubtask,
        completed: false
      });
      setNewSubtask('');
      setShowAddForm(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSubtask();
    } else if (e.key === 'Escape') {
      setNewSubtask('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="subtasks-list">
      <div className="subtasks-header">
        <h4>Subtasks</h4>
        <button 
          className="add-subtask-btn"
          onClick={() => setShowAddForm(true)}
        >
          +
        </button>
      </div>

      <div className="subtasks-items">
        {subtasks.map(subtask => (
          <div key={subtask.id} className="subtask-item">
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => onSubtaskUpdate?.(subtask.id, { completed: !subtask.completed })}
              className="subtask-checkbox"
            />
            <span className={`subtask-title ${subtask.completed ? 'completed' : ''}`}>
              {subtask.title}
            </span>
            <button
              className="delete-subtask-btn"
              onClick={() => onSubtaskDelete?.(subtask.id)}
            >
              ×
            </button>
          </div>
        ))}

        {showAddForm && (
          <div className="add-subtask-form">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => setShowAddForm(false)}
              placeholder="Add subtask..."
              autoFocus
              className="subtask-input"
            />
          </div>
        )}

        {subtasks.length === 0 && !showAddForm && (
          <div className="no-subtasks">
            <span>No subtasks yet</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtasksList;
