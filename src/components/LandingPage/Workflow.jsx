import React from 'react';
import './styles/Workflow.css';

const Workflow = () => {
  return (
    <section className="workflow-section" id="how-it-works">
      <div className="workflow-container section-container">
        <div className="workflow-header">
          <div className="workflow-badge">How It Works</div>
          <h2>Simple workflow. Maximum productivity.</h2>
          <p>Get started in minutes with a simple three-step process.</p>
        </div>

        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-icon">📝</div>
              <h3>Create Tasks</h3>
              <p>Add tasks with titles, descriptions, due dates, and priorities. Organize them by categories to stay structured.</p>
            </div>
            <div className="step-image app-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-title">New Task</div>
              </div>
              <div className="mockup-content create-task-mockup">
                <div className="mockup-form">
                  <div className="mockup-input">
                    <label>Task Title</label>
                    <div className="input-field">Prepare presentation for team meeting</div>
                  </div>
                  <div className="mockup-input">
                    <label>Description</label>
                    <div className="input-field textarea">Create slides for quarterly review...</div>
                  </div>
                  <div className="mockup-row">
                    <div className="mockup-input half">
                      <label>Due Date</label>
                      <div className="input-field date">Mar 15, 2023</div>
                    </div>
                    <div className="mockup-input half">
                      <label>Priority</label>
                      <div className="input-field priority high">High</div>
                    </div>
                  </div>
                  <div className="mockup-button">Create Task</div>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-icon">🔄</div>
              <h3>Organize & Prioritize</h3>
              <p>Drag and drop tasks to arrange them by importance. Set priorities and deadlines to focus on what matters most.</p>
            </div>
            <div className="step-image app-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-title">My Tasks</div>
              </div>
              <div className="mockup-content organize-mockup">
                <div className="mockup-tabs">
                  <div className="tab active">Today</div>
                  <div className="tab">Upcoming</div>
                  <div className="tab">All Tasks</div>
                </div>
                <div className="mockup-tasks">
                  <div className="mockup-task high">
                    <div className="task-checkbox"></div>
                    <div className="task-content">
                      <div className="task-title">Prepare presentation</div>
                      <div className="task-meta">Today · High Priority</div>
                    </div>
                    <div className="task-drag">⋮</div>
                  </div>
                  <div className="mockup-task medium">
                    <div className="task-checkbox"></div>
                    <div className="task-content">
                      <div className="task-title">Team standup meeting</div>
                      <div className="task-meta">1:30 PM · Medium Priority</div>
                    </div>
                    <div className="task-drag">⋮</div>
                  </div>
                  <div className="mockup-task low">
                    <div className="task-checkbox"></div>
                    <div className="task-content">
                      <div className="task-title">Review project proposal</div>
                      <div className="task-meta">2:00 PM · Low Priority</div>
                    </div>
                    <div className="task-drag">⋮</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-icon">✅</div>
              <h3>Track & Complete</h3>
              <p>Monitor your progress, check off completed tasks, and enjoy the satisfaction of getting things done!</p>
            </div>
            <div className="step-image app-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-title">Progress Dashboard</div>
              </div>
              <div className="mockup-content complete-mockup">
                <div className="mockup-progress">
                  <div className="progress-stats">
                    <div className="stat-item">
                      <div className="stat-value">12</div>
                      <div className="stat-label">Completed</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">75%</div>
                      <div className="stat-label">Completion Rate</div>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                </div>
                <div className="mockup-tasks completed-tasks">
                  <div className="mockup-task completed">
                    <div className="task-checkbox checked">✓</div>
                    <div className="task-content">
                      <div className="task-title">Send client proposal</div>
                      <div className="task-meta">Completed today</div>
                    </div>
                  </div>
                  <div className="mockup-task completed">
                    <div className="task-checkbox checked">✓</div>
                    <div className="task-content">
                      <div className="task-title">Research competitors</div>
                      <div className="task-meta">Completed yesterday</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;