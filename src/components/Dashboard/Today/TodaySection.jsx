import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import './TodaySection.css';

const TodaySection = () => {
  const { state, toggleTask } = useDashboard();
  const { tasks = [] } = state || {};
  
  // Filter tasks for today
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.dueDate === today);
  const completedCount = todayTasks.filter(task => task.completed).length;
  const totalCount = todayTasks.length;

  return (
    <div className="today-section">
      <div className="section-header">
        <h2>Today</h2>
        <div className="progress-info">
          <span className="progress-text">{completedCount}/{totalCount} completed</span>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="today-tasks">
        {todayTasks.map(task => (
          <div key={task.id} className={`today-task ${task.completed ? 'completed' : ''}`}>
            <div className="task-time">{task.time || 'All day'}</div>
            <div className="task-content">
              <div className="task-main">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className="task-title">{task.title}</span>
              </div>
              <span 
                className={`task-priority priority-${task.priority}`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {todayTasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks scheduled for today. Enjoy your free time!</p>
        </div>
      )}
    </div>
  );
};

export default TodaySection;