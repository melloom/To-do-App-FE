import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import './OverdueSection.css';

const OverdueSection = () => {
  const { state, toggleTask, deleteTask } = useDashboard();
  const { tasks = [] } = state || {};
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Filter tasks for overdue (past due dates)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  }).map(task => {
    const dueDate = new Date(task.dueDate);
    const daysPast = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
    return { ...task, daysPast };
  });

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };
  const markAsComplete = (taskId) => {
    toggleTask(taskId);
    setSelectedTasks(prev => prev.filter(id => id !== taskId));
  };

  const rescheduleTask = (taskId) => {
    // This would typically open a date picker modal
    console.log('Reschedule task:', taskId);
  };

  const bulkReschedule = () => {
    console.log('Bulk reschedule tasks:', selectedTasks);
  };

  const urgentTasks = overdueTasks.filter(task => task.priority === 'high' || task.daysPast >= 5);

  return (
    <div className="overdue-section">
      <div className="section-header">
        <div className="header-left">
          <h2>Overdue Tasks</h2>
          <div className="overdue-stats">
            <span className="total-count">{overdueTasks.length} tasks</span>
            <span className="urgent-count">{urgentTasks.length} urgent</span>
          </div>
        </div>
        {selectedTasks.length > 0 && (
          <div className="bulk-actions">
            <span className="selected-count">{selectedTasks.length} selected</span>
            <button className="bulk-btn reschedule" onClick={bulkReschedule}>
              Reschedule All
            </button>
          </div>
        )}
      </div>

      {urgentTasks.length > 0 && (
        <div className="urgent-section">
          <div className="urgent-header">
            <h3>🚨 Urgent Actions Required</h3>
            <p>These tasks are high priority or significantly overdue</p>
          </div>
          <div className="urgent-tasks">
            {urgentTasks.map(task => (
              <div key={task.id} className="urgent-task">
                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  <span className="overdue-info">{task.daysPast} days overdue</span>
                </div>
                <div className="urgent-actions">
                  <button 
                    className="complete-btn"
                    onClick={() => markAsComplete(task.id)}
                  >
                    Complete Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="overdue-tasks">
        {overdueTasks.map(task => (
          <div key={task.id} className={`overdue-task ${selectedTasks.includes(task.id) ? 'selected' : ''}`}>
            <div className="task-checkbox-wrapper">
              <input
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={() => handleTaskSelect(task.id)}
                className="task-select-checkbox"
              />
            </div>
            <div className="task-content">
              <div className="task-main">
                <span className="task-title">{task.title}</span>
                <div className="task-details">
                  <span className="due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  <span className={`overdue-badge days-${Math.min(task.daysPast, 7)}`}>
                    {task.daysPast} day{task.daysPast !== 1 ? 's' : ''} overdue
                  </span>
                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
              <div className="task-actions">
                <button 
                  className="action-btn complete"
                  onClick={() => markAsComplete(task.id)}
                >
                  Mark Complete
                </button>
                <button 
                  className="action-btn reschedule"
                  onClick={() => rescheduleTask(task.id)}
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {overdueTasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">✅</div>
          <h3>All caught up!</h3>
          <p>You have no overdue tasks. Great job staying on top of things!</p>
        </div>
      )}
    </div>
  );
};

export default OverdueSection;