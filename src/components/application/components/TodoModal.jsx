import React, { useState, useEffect } from 'react';
import './styles/TodoModal.css';

const TodoModal = ({ isOpen, onClose, onSave, editingTask }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'work',
    priority: 'medium',
    completed: false
  });

  useEffect(() => {
    if (editingTask) {
      // Format the date to YYYY-MM-DD for the date input
      const formattedDate = editingTask.dueDate ?
        new Date(editingTask.dueDate).toISOString().split('T')[0] : '';

      setTask({
        ...editingTask,
        dueDate: formattedDate
      });
    } else {
      // Set default due date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedTomorrow = tomorrow.toISOString().split('T')[0];

      setTask({
        title: '',
        description: '',
        dueDate: formattedTomorrow,
        category: 'work',
        priority: 'medium',
        completed: false
      });
    }
  }, [editingTask, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="task-modal">
        <div className="modal-header">
          <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Task Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="What do you need to do?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Add details about this task"
                rows="3"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={task.category}
                  onChange={handleChange}
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <div className="priority-options">
                <label className={`priority-option low ${task.priority === 'low' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="priority"
                    value="low"
                    checked={task.priority === 'low'}
                    onChange={handleChange}
                  />
                  <span>Low</span>
                </label>
                <label className={`priority-option medium ${task.priority === 'medium' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="priority"
                    value="medium"
                    checked={task.priority === 'medium'}
                    onChange={handleChange}
                  />
                  <span>Medium</span>
                </label>
                <label className={`priority-option high ${task.priority === 'high' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="priority"
                    value="high"
                    checked={task.priority === 'high'}
                    onChange={handleChange}
                  />
                  <span>High</span>
                </label>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {editingTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;