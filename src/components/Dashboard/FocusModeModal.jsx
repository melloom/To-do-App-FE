import React, { useState, useEffect, useRef } from 'react';
import './FocusModeModal.css';

const FocusModeModal = ({
  isOpen,
  onClose,
  tasks,
  onCompleteTask,
  initialSelectedTask = null
}) => {
  const [activeTask, setActiveTask] = useState(initialSelectedTask);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showBreakReminder, setShowBreakReminder] = useState(false);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('tasks');
  const timerRef = useRef(null);
  const modalRef = useRef(null);

  // Get high priority incomplete tasks
  const priorityTasks = tasks?.filter(task =>
    !task.completed && task.priority === 'high'
  ) || [];

  const otherTasks = tasks?.filter(task =>
    !task.completed && task.priority !== 'high'
  ) || [];

  // Set initial active task if provided
  useEffect(() => {
    if (initialSelectedTask) {
      setActiveTask(initialSelectedTask);
      setActiveTab('focus');
    }
  }, [initialSelectedTask]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Start/stop timer based on isRunning state
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;

          // Show break reminder every 25 minutes (1500 seconds)
          if (newTime % 1500 === 0) {
            setShowBreakReminder(true);
          }

          return newTime;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle task selection
  const handleTaskSelect = (task) => {
    if (activeTask?.id === task.id) return;

    setActiveTask(task);
    setNotes('');
    setTimeElapsed(0);
    setIsRunning(false);
    setShowBreakReminder(false);
    setActiveTab('focus');
  };

  // Start/stop the timer
  const handleStartStop = () => {
    if (!activeTask) return;
    setIsRunning(prev => !prev);
  };

  // Complete the active task
  const handleCompleteTask = () => {
    if (!activeTask) return;

    onCompleteTask(activeTask.id, notes);
    setIsRunning(false);
    setActiveTask(null);
    setTimeElapsed(0);
    setNotes('');
    setActiveTab('tasks');
  };

  // Dismiss break reminder
  const handleDismissReminder = () => {
    setShowBreakReminder(false);
  };

  // Close the modal with confirmation if needed
  const handleCloseModal = () => {
    if (isRunning) {
      if (window.confirm('Timer is still running. Are you sure you want to exit focus mode?')) {
        setIsRunning(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="focus-mode-modal-overlay">
      <div className="focus-mode-modal" ref={modalRef}>
        <div className="focus-mode-header">
          <h2>Focus Mode</h2>
          <button className="close-modal-btn" onClick={handleCloseModal}>×</button>
        </div>

        <div className="focus-mode-tabs">
          <button
            className={`focus-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Select Task
          </button>
          <button
            className={`focus-tab ${activeTab === 'focus' ? 'active' : ''}`}
            onClick={() => setActiveTab('focus')}
            disabled={!activeTask}
          >
            Focus Timer
          </button>
        </div>

        <div className="focus-mode-content">
          {activeTab === 'tasks' ? (
            <div className="task-selection">
              {priorityTasks.length > 0 && (
                <>
                  <h4 className="task-category">High Priority</h4>
                  <ul className="task-list">
                    {priorityTasks.map(task => (
                      <li
                        key={task.id}
                        className={`task-item ${activeTask?.id === task.id ? 'active' : ''}`}
                        onClick={() => handleTaskSelect(task)}
                      >
                        <div className="task-priority high"></div>
                        <span>{task.title}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {otherTasks.length > 0 && (
                <>
                  <h4 className="task-category">Other Tasks</h4>
                  <ul className="task-list">
                    {otherTasks.map(task => (
                      <li
                        key={task.id}
                        className={`task-item ${activeTask?.id === task.id ? 'active' : ''}`}
                        onClick={() => handleTaskSelect(task)}
                      >
                        <div className={`task-priority ${task.priority || 'normal'}`}></div>
                        <span>{task.title}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {priorityTasks.length === 0 && otherTasks.length === 0 && (
                <div className="no-tasks-message">
                  <div className="empty-state-icon">📋</div>
                  <p>No incomplete tasks available.</p>
                  <p>Create a task to start focusing.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="focus-workspace">
              {activeTask ? (
                <>
                  <div className="focus-task-header">
                    <h3>Focusing on:</h3>
                    <div className="focus-task-title">{activeTask.title}</div>
                  </div>

                  <div className="focus-timer">
                    <div className="timer-circle">
                      <div className="timer-display">{formatTime(timeElapsed)}</div>
                    </div>
                    <button
                      className={`timer-control ${isRunning ? 'running' : ''}`}
                      onClick={handleStartStop}
                    >
                      {isRunning ? 'Pause' : 'Start Focus'}
                    </button>
                  </div>

                  <div className="focus-notes">
                    <h4>Session Notes</h4>
                    <textarea
                      placeholder="Add notes about your progress here..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    className="complete-task-btn"
                    onClick={handleCompleteTask}
                  >
                    Complete Task
                  </button>
                </>
              ) : (
                <div className="no-task-selected">
                  <div className="empty-state-icon">🎯</div>
                  <h3>Select a task to enter focus mode</h3>
                  <p>Choose a task from the task list to start focusing.</p>
                  <button
                    className="select-task-btn"
                    onClick={() => setActiveTab('tasks')}
                  >
                    Select Task
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {showBreakReminder && (
          <div className="break-reminder">
            <div className="reminder-content">
              <div className="reminder-icon">⏰</div>
              <h3>Time for a break!</h3>
              <p>You've been focusing for 25 minutes. Consider taking a short 5-minute break to rest your eyes and stretch.</p>
              <button className="reminder-btn" onClick={handleDismissReminder}>Continue Working</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusModeModal;
