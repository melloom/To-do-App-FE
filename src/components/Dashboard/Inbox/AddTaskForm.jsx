import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({ title: title.trim(), priority });
      setTitle('');
      setIsOpen(false);
    }
  };

  return (
    <div className="add-task-form">
      {!isOpen ? (
        <button 
          className="add-task-btn"
          onClick={() => setIsOpen(true)}
        >
          + Add Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="task-input"
            autoFocus
          />
          <div className="form-controls">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="form-buttons">
              <button type="submit" className="save-btn">Save</button>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTaskForm;