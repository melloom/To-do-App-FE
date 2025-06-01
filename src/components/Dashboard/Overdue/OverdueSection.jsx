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

  // Get current theme for theme-specific content
  const getCurrentTheme = () => {
    const bodyClasses = document.body.className;
    const themeMatch = bodyClasses.match(/theme-(\w+)/);
    return themeMatch ? themeMatch[1] : 'default';
  };

  const getThemeEmptyMessage = () => {
    const theme = getCurrentTheme();
    const messages = {
      spiderman: "🕷️ Web-slinging success! No overdue tasks detected. Your responsibility is amazing!",
      hulk: "💚 HULK HAPPY! No overdue tasks to smash! Hulk proud of good planning!",
      ironman: "⚡ Impressive efficiency! All systems green - no overdue tasks detected. Friday would approve!",
      thor: "⚡ By Mjolnir! You've proven worthy! No overdue tasks cloud your horizon!",
      captain: "🛡️ Outstanding, soldier! No overdue missions. You've earned the title of Captain Punctual!",
      panther: "🐾 Wakanda-level precision! Your commitment to deadlines honors the Black Panther legacy!",
      spongebob: "🍍 I'm ready, and you're ready too! No overdue tasks in Bikini Bottom today!",
      mickey: "🏰 Ho-ho! Pure Disney magic! Your timely task completion brings smiles everywhere!",
      pikachu: "⚡ Pika-perfect timing! No overdue tasks to battle! You're the very best!",
      turtles: "🍕 Cowabunga! No overdue missions! Time to celebrate with pizza, dudes!",
      default: "All caught up! You have no overdue tasks. Great job staying on top of things!"
    };
    return messages[theme] || messages.default;
  };

  const getThemeIcon = () => {
    const theme = getCurrentTheme();
    const icons = {
      spiderman: '🕷️',
      hulk: '💪',
      ironman: '⚠️',
      thor: '⚡',
      captain: '🛡️',
      panther: '🐾',
      spongebob: '🍍',
      mickey: '🏰',
      pikachu: '⚡',
      turtles: '🍕',
      default: '⚠️'
    };
    return icons[theme] || icons.default;
  };

  const getThemeSuccessIcon = () => {
    const theme = getCurrentTheme();
    const icons = {
      spiderman: '🕷️',
      hulk: '💚',
      ironman: '⚡',
      thor: '🔨',
      captain: '🛡️',
      panther: '🐾',
      spongebob: '🎉',
      mickey: '✨',
      pikachu: '⭐',
      turtles: '🎉',
      default: '✅'
    };
    return icons[theme] || icons.default;
  };

  const getThemeUrgentHeader = () => {
    const theme = getCurrentTheme();
    const headers = {
      spiderman: "🕷️ Spider-Sense Alert! Urgent Tasks Detected!",
      hulk: "💚 HULK ANGRY! URGENT TASKS NEED SMASHING!",
      ironman: "⚠️ Critical Alert! Urgent Actions Required!",
      thor: "⚡ By the Nine Realms! Urgent Tasks Await!",
      captain: "🛡️ Red Alert! Urgent Missions Require Attention!",
      panther: "🐾 Wakandan Priority Alert! Urgent Tasks Detected!",
      spongebob: "🍍 Oh barnacles! Urgent tasks need attention!",
      mickey: "🏰 Oh boy! Some urgent tasks need our magic touch!",
      pikachu: "⚡ Pika-urgent! High priority tasks detected!",
      turtles: "🍕 Turtle Power needed! Urgent missions await!",
      default: "🚨 Urgent Actions Required"
    };
    return headers[theme] || headers.default;
  };

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
          <h2>
            <span className="section-icon">{getThemeIcon()}</span>
            Overdue Tasks
          </h2>
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
            <h3>{getThemeUrgentHeader()}</h3>
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
          <div className="empty-icon">{getThemeSuccessIcon()}</div>
          <h3>All caught up!</h3>
          <p>{getThemeEmptyMessage()}</p>
        </div>
      )}
    </div>
  );
};

export default OverdueSection;