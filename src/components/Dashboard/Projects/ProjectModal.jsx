import React, { useState, useEffect } from 'react';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, onSave, onViewTasks, project }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#6366f1',
    category: 'work'
  });
  const [errors, setErrors] = useState({});

  const colorOptions = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', 
    '#f97316', '#f59e0b', '#84cc16', '#22c55e', 
    '#10b981', '#06b6d4', '#0ea5e9', '#3b82f6', 
    '#a855f7', '#d946ef', '#f43f5e', '#64748b'
  ];

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        color: project.color || '#6366f1',
        category: project.category || 'work'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        color: '#6366f1',
        category: 'work'
      });
    }
    setErrors({});
  }, [project, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Project name must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleViewTasks = () => {
    if (project) {
      onViewTasks(project);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="project-modal-header">
          <div className="header-content">
            <div className="header-icon" style={{ backgroundColor: formData.color }}>
              {project ? '✏️' : '📁'}
            </div>
            <div className="header-text">
              <h2>{project ? 'Edit Project' : 'Create New Project'}</h2>
              <p>{project ? 'Update your project details' : 'Set up a new project to organize your tasks'}</p>
            </div>
          </div>
          <button className="project-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="project-modal-form">
          {/* Project Preview */}
          {formData.name && (
            <div className="project-preview">
              <span className="preview-label">Preview</span>
              <div className="preview-item">
                <div className="preview-color" style={{ backgroundColor: formData.color }} />
                <span className="preview-name">{formData.name}</span>
                <span className="preview-category">{formData.category}</span>
              </div>
            </div>
          )}

          {/* Project Name */}
          <div className="form-group">
            <label htmlFor="project-name">
              Project Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="project-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Website Redesign, Personal Goals..."
              className={`form-input ${errors.name ? 'error' : ''}`}
              autoFocus
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="project-description">Description</label>
            <textarea
              id="project-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="What's this project about? (optional)"
              className="form-textarea"
              rows="3"
            />
          </div>          {/* Color Selection */}
          <div className="form-group">
            <label>Project Color</label>
            <div className="color-picker-container">
              <div className="color-picker">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`color-option ${formData.color === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData(prev => ({ ...prev, color }))}
                    title={color}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="project-category">Category</label>
            <select
              id="project-category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="work">🏢 Work</option>
              <option value="personal">👤 Personal</option>
              <option value="learning">📚 Learning</option>
              <option value="health">🏃 Health & Fitness</option>
              <option value="finance">💰 Finance</option>
              <option value="creative">🎨 Creative</option>
              <option value="travel">✈️ Travel</option>
              <option value="other">📝 Other</option>
            </select>
          </div>

          {/* Actions */}
          <div className="form-actions">
            {project && (
              <button
                type="button"
                className="view-tasks-btn"
                onClick={handleViewTasks}
              >
                <span>📋</span>
                View Tasks
              </button>
            )}
            <div className="action-buttons">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={!formData.name.trim()}
              >
                <span>{project ? '💾' : '✨'}</span>
                {project ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;