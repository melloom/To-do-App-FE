import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const TaskForm = ({ projectId, onTaskAdded }) => {
  const { addTask } = useDashboard();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [isOpen, setIsOpen] = useState(false);

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

    const newTask = {
      ...formData,
      project: projectId || 'Inbox',
      completed: false,
      createdAt: new Date(),
      id: Date.now().toString()
    };

    addTask(newTask);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    
    setIsOpen(false);
    onTaskAdded && onTaskAdded(newTask);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="add-task-btn"
        style={{
          background: '#6366f1',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '20px'
        }}
      >
        + Add Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task title..."
          required
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description (optional)..."
          rows="2"
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={{
            padding: '8px 10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          style={{
            padding: '8px 10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          type="submit"
          style={{
            background: '#10b981',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Add Task
        </button>
        <button 
          type="button"
          onClick={() => setIsOpen(false)}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
