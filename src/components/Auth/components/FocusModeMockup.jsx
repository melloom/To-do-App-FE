import './FocusModeMockup.css';

const FocusModeMockup = () => {
  return (
    <div className="focus-mode-mockup">
      <div className="mockup-header">
        <h3>Focus Mode</h3>
        <div className="mockup-timer">25:00</div>
      </div>

      <div className="mockup-content">
        <div className="mockup-task-area">
          <div className="mockup-current-task">
            <div className="task-status-indicator active"></div>
            <div className="task-content">
              <h4>Complete project presentation</h4>
              <div className="task-meta">High Priority • 30 min</div>
            </div>
          </div>

          <div className="mockup-button primary">Pause Focus Session</div>
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

<div className="focus-timer-container">
