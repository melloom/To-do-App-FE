import React, { useState } from 'react';
import FocusModeModal from './FocusModeModal';
import './FocusMode.css';

const FocusMode = ({ tasks, onCompleteTask }) => {
  const [showFocusModal, setShowFocusModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Get high priority incomplete tasks
  const priorityTasks = tasks?.filter(task =>
    !task.completed && task.priority === 'high'
  ) || [];

  const otherTasks = tasks?.filter(task =>
    !task.completed && task.priority !== 'high'
  ) || [];

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setShowFocusModal(true);
  };

  const handleCloseModal = () => {
    setShowFocusModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="focus-mode-container">
      <div className="focus-header">
        <h2>Focus Mode</h2>
        <p className="focus-subtitle">Select a task to focus on and eliminate distractions</p>
      </div>

      <div className="focus-content">
        <div className="focus-benefits">
          <div className="benefit-card">
            <div className="benefit-icon">🧠</div>
            <h3>Deep Focus</h3>
            <p>Eliminate distractions and focus on one task at a time</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⏱️</div>
            <h3>Time Tracking</h3>
            <p>Monitor how long you spend on each task</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📝</div>
            <h3>Session Notes</h3>
            <p>Keep track of your progress and thoughts</p>
          </div>
        </div>

        <div className="task-selection-section">
          <h3>Select a Task to Focus On</h3>

          {priorityTasks.length > 0 && (
            <div className="focus-task-category">
              <h4>High Priority</h4>
              <div className="focus-task-grid">
                {priorityTasks.map(task => (
                  <div
                    key={task.id}
                    className="focus-task-card"
                    onClick={() => handleTaskSelect(task)}
                  >
                    <div className="focus-task-priority high"></div>
                    <h4 className="focus-task-title">{task.title}</h4>
                    <button className="focus-task-btn">
                      Start Focus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {otherTasks.length > 0 && (
            <div className="focus-task-category">
              <h4>Other Tasks</h4>
              <div className="focus-task-grid">
                {otherTasks.map(task => (
                  <div
                    key={task.id}
                    className="focus-task-card"
                    onClick={() => handleTaskSelect(task)}
                  >
                    <div className={`focus-task-priority ${task.priority || 'normal'}`}></div>
                    <h4 className="focus-task-title">{task.title}</h4>
                    <button className="focus-task-btn">
                      Start Focus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {priorityTasks.length === 0 && otherTasks.length === 0 && (
            <div className="no-focus-tasks">
              <div className="empty-state-icon">📋</div>
              <h3>No tasks available</h3>
              <p>Create new tasks to start focusing on your work</p>
            </div>
          )}
        </div>
      </div>

      <FocusModeModal
        isOpen={showFocusModal}
        onClose={handleCloseModal}
        tasks={tasks}
        onCompleteTask={onCompleteTask}
        initialSelectedTask={selectedTask}
      />
    </div>
  );
};

export default FocusMode;
