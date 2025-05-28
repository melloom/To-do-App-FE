import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './QuickAdd.css';

const QuickAdd = ({ onClose }) => {
  const { addTask, state } = useDashboard();
  const { projects = [] } = state || {};
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    project: 'Inbox',
    dueDate: '',
    labels: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    addTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      project: formData.project,
      dueDate: formData.dueDate || null,
      labels: formData.labels,
      completed: false,
      createdAt: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="quick-add-overlay" onClick={onClose}>
      <div className="quick-add-modal" onClick={(e) => e.stopPropagation()}>
        <div className="quick-add-header">
          <h3>Quick Add Task</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="quick-add-form">
          <input
            type="text"
            name="title"
            placeholder="Task title..."
            value={formData.title}
            onChange={handleChange}
            autoFocus
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />

          <div className="form-row">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
            >
              <option value="Inbox">Inbox</option>
              {projects.map(project => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickAdd;
