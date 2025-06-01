import React, { useState, useEffect } from 'react';
import './FocusModeMockup.css';

const FocusModeMockup = () => {
  const [seconds, setSeconds] = useState(1500); // 25 minutes
  const [isPaused, setIsPaused] = useState(false);
  const totalSeconds = 1500;

  useEffect(() => {
    if (!isPaused && seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds, isPaused]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((totalSeconds - seconds) / totalSeconds) * 100;

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="focus-mode-mockup">
      <div className="mockup-header">
        <h3>Focus Mode</h3>
        <div className="mockup-timer">{formatTime(seconds)}</div>
      </div>

      <div className="mockup-content">
        <div className="timer-circle-container">
          <div className="timer-circle" style={{ '--progress': `${progressPercentage}%` }}>
            <div className="timer-display">
              <div className="timer-time">{formatTime(seconds)}</div>
              <div className="timer-label">Focus Session</div>
            </div>
          </div>
        </div>

        <div className="mockup-task-area">
          <div className="mockup-current-task">
            <div className="task-status-indicator active"></div>
            <div className="task-content">
              <h4>Complete project presentation</h4>
              <div className="task-meta">High Priority • 30 min</div>
            </div>
          </div>

          <div className="mockup-button primary" onClick={togglePause}>
            {isPaused ? 'Resume Focus Session' : 'Pause Focus Session'}
          </div>
        </div>

        <div className="mockup-task-list">
          <div className="mockup-list-header">Next up</div>

          <div className="mockup-task-item">
            <div className="task-status-indicator"></div>
            <div className="task-title">Review feedback</div>
          </div>

          <div className="mockup-task-item">
            <div className="task-status-indicator"></div>
            <div className="task-title">Schedule team meeting</div>
          </div>

          <div className="mockup-task-item">
            <div className="task-status-indicator"></div>
            <div className="task-title">Update documentation</div>
          </div>
        </div>
      </div>

      <div className="mockup-notes">
        <div className="mockup-notes-header">Session Notes</div>
        <div className="mockup-notes-content">
          Added key points about market analysis and updated the competitive positioning slides.
        </div>
      </div>
    </div>
  );
};

export default FocusModeMockup;
