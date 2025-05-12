import React from 'react';
import './styles/Workflow.css';

const Workflow = () => {
  return (
    <section className="workflow-section" id="how-it-works">
      <div className="workflow-container section-container">
        <div className="workflow-header">
          <div className="workflow-badge">How It Works</div>
          <h2>Simple workflow. Maximum productivity.</h2>
          <p>Get started in minutes with a simple three-step process that will transform the way you manage tasks.</p>
        </div>

        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-icon">📝</div>
              <h3>Create Tasks</h3>
              <p className="step-description">
                <strong>Step 1: Capture Everything</strong> - Quickly add tasks with detailed information. Include titles, descriptions, due dates, and priorities to keep your work organized and structured.
              </p>
              <ul className="step-features">
                <li>Create tasks in seconds</li>
                <li>Set deadlines and reminders</li>
                <li>Add priority levels</li>
                <li>Organize by categories</li>
              </ul>
            </div>
            <div className="step-mockup-container">
              <div className="step-image app-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="mockup-title">Task Creation Interface</div>
                  <div className="mockup-controls">
                    <div className="mockup-control"></div>
                    <div className="mockup-control"></div>
                  </div>
                </div>
                <div className="mockup-content create-task-mockup">
                  <div className="mockup-form">
                    <div className="mockup-input">
                      <label>Task Title</label>
                      <div className="input-field">Prepare presentation for team meeting</div>
                    </div>
                    <div className="mockup-input">
                      <label>Description</label>
                      <div className="input-field textarea">Create slides for quarterly review with key metrics and project updates. Include section for Q&A.</div>
                    </div>
                    <div className="mockup-row">
                      <div className="mockup-input half">
                        <label>Due Date</label>
                        <div className="input-field date">
                          <span className="date-icon">📅</span> May 15, 2025
                        </div>
                      </div>
                      <div className="mockup-input half">
                        <label>Priority</label>
                        <div className="input-field priority high">
                          <span className="priority-dot"></span> High Priority
                        </div>
                      </div>
                    </div>
                    <div className="mockup-row">
                      <div className="mockup-input half">
                        <label>Category</label>
                        <div className="input-field category">
                          <span className="category-color" style={{backgroundColor: "#4f46e5"}}></span> Work
                        </div>
                      </div>
                      <div className="mockup-input half">
                        <label>Reminder</label>
                        <div className="input-field reminder">
                          <span className="reminder-icon">🔔</span> 1 day before
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="step-info-panel">
                <h4>Task Creation Made Simple</h4>
                <p>Our intuitive task creation form makes it easy to capture all the details you need. Save time with smart defaults and quick-access fields.</p>
                <ul className="step-info-features">
                  <li>🚀 Streamlined task entry</li>
                  <li>🎯 Custom priority settings</li>
                  <li>📅 Smart date picker</li>
                  <li>📝 Rich text descriptions</li>
                </ul>
                <div className="mockup-info">
                  <p><strong>Pro tip:</strong> Use keyboard shortcuts (Alt+N) to quickly create new tasks from anywhere in the app.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-icon">🔄</div>
              <h3>Organize & Prioritize</h3>
              <p className="step-description">
                <strong>Step 2: Bring Order to Chaos</strong> - Take control of your task list with intuitive organization tools. Sort tasks by due date, priority, or category to focus on what's most important.
              </p>
              <ul className="step-features">
                <li>Drag and drop to reorder tasks</li>
                <li>Filter by priority or deadline</li>
                <li>Toggle between different views</li>
                <li>Group related tasks together</li>
              </ul>
            </div>
            <div className="step-mockup-container">
              <div className="step-image app-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="mockup-title">My Tasks</div>
                  <div className="mockup-controls">
                    <div className="mockup-control"></div>
                    <div className="mockup-control"></div>
                  </div>
                </div>
                <div className="mockup-content organize-mockup">
                  <div className="mockup-tabs">
                    <div className="tab active">Today</div>
                    <div className="tab">Upcoming</div>
                    <div className="tab">All Tasks</div>
                  </div>
                  <div className="mockup-filter-bar">
                    <div className="filter-label">Filter:</div>
                    <div className="filter-badge active">All</div>
                    <div className="filter-badge">Work</div>
                    <div className="filter-badge">Personal</div>
                  </div>
                  <div className="mockup-tasks">
                    <div className="mockup-task high">
                      <div className="task-checkbox"></div>
                      <div className="task-content">
                        <div className="task-title">Prepare presentation</div>
                        <div className="task-meta">
                          <span className="task-time">2:00 PM</span>
                          <span className="task-priority-badge high">High</span>
                          <span className="task-category">Work</span>
                        </div>
                      </div>
                      <div className="task-actions">
                        <div className="task-action edit">✏️</div>
                        <div className="task-drag">⋮</div>
                      </div>
                    </div>
                    <div className="mockup-task medium">
                      <div className="task-checkbox"></div>
                      <div className="task-content">
                        <div className="task-title">Team standup meeting</div>
                        <div className="task-meta">
                          <span className="task-time">1:30 PM</span>
                          <span className="task-priority-badge medium">Medium</span>
                          <span className="task-category">Work</span>
                        </div>
                      </div>
                      <div className="task-actions">
                        <div className="task-action edit">✏️</div>
                        <div className="task-drag">⋮</div>
                      </div>
                    </div>
                    <div className="mockup-task low">
                      <div className="task-checkbox"></div>
                      <div className="task-content">
                        <div className="task-title">Review project proposal</div>
                        <div className="task-meta">
                          <span className="task-time">2:00 PM</span>
                          <span className="task-priority-badge low">Low</span>
                          <span className="task-category">Work</span>
                        </div>
                      </div>
                      <div className="task-actions">
                        <div className="task-action edit">✏️</div>
                        <div className="task-drag">⋮</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="step-info-panel">
                <h4>Smart Organization System</h4>
                <p>Bring order to your task list with our flexible organization tools. Sort, filter, and group tasks to match your unique workflow and keep everything accessible.</p>
                <ul className="step-info-features">
                  <li>🔄 Drag-and-drop reordering</li>
                  <li>🧠 Smart sorting algorithms</li>
                  <li>🔍 Powerful search & filtering</li>
                  <li>🌈 Visual priority indicators</li>
                </ul>
                <div className="mockup-info">
                  <p><strong>Pro tip:</strong> Use the "Focus Mode" to hide all but your highest priority tasks for distraction-free work sessions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-icon">✅</div>
              <h3>Track & Complete</h3>
              <p className="step-description">
                <strong>Step 3: Achieve More</strong> - Monitor your progress and celebrate your achievements. Visualize your productivity with analytics and watch your completion rate soar as you check items off your list.
              </p>
              <ul className="step-features">
                <li>Track daily and weekly progress</li>
                <li>View productivity trends</li>
                <li>Get completion statistics</li>
                <li>Celebrate achievements</li>
              </ul>
            </div>
            <div className="step-mockup-container">
              <div className="step-image app-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="mockup-title">Progress Dashboard</div>
                  <div className="mockup-controls">
                    <div className="mockup-control"></div>
                    <div className="mockup-control"></div>
                  </div>
                </div>
                <div className="mockup-content complete-mockup">
                  <div className="mockup-date-selector">
                    <div className="date-nav prev">◀</div>
                    <div className="date-display">This Week (May 8-14)</div>
                    <div className="date-nav next">▶</div>
                  </div>
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
                      <div className="stat-item">
                        <div className="stat-value">4</div>
                        <div className="stat-label">Active Tasks</div>
                      </div>
                    </div>
                    <div className="progress-chart">
                      <div className="chart-day">
                        <div className="chart-bar" style={{height: '60%'}}></div>
                        <div className="chart-label">Mon</div>
                      </div>
                      <div className="chart-day">
                        <div className="chart-bar" style={{height: '80%'}}></div>
                        <div className="chart-label">Tue</div>
                      </div>
                      <div className="chart-day">
                        <div className="chart-bar" style={{height: '40%'}}></div>
                        <div className="chart-label">Wed</div>
                      </div>
                      <div className="chart-day">
                        <div className="chart-bar" style={{height: '90%'}}></div>
                        <div className="chart-label">Thu</div>
                      </div>
                      <div className="chart-day active">
                        <div className="chart-bar" style={{height: '70%'}}></div>
                        <div className="chart-label">Fri</div>
                      </div>
                      <div className="chart-day">
                        <div className="chart-bar" style={{height: '20%'}}></div>
                        <div className="chart-label">Sat</div>
                      </div>
                      <div className="chart-day">
                        <div className="chart-bar" style={{height: '30%'}}></div>
                        <div className="chart-label">Sun</div>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                      <div className="progress-label">Weekly Goal: 75% Complete</div>
                    </div>
                  </div>
                  <div className="mockup-section-title">Recently Completed</div>
                  <div className="mockup-tasks completed-tasks">
                    <div className="mockup-task completed">
                      <div className="task-checkbox checked">✓</div>
                      <div className="task-content">
                        <div className="task-title">Send client proposal</div>
                        <div className="task-meta">
                          <span className="task-time">Completed today</span>
                          <span className="task-category">Client</span>
                        </div>
                      </div>
                      <div className="task-achievement">
                        <span className="achievement-icon">🏆</span>
                      </div>
                    </div>
                    <div className="mockup-task completed">
                      <div className="task-checkbox checked">✓</div>
                      <div className="task-content">
                        <div className="task-title">Research competitors</div>
                        <div className="task-meta">
                          <span className="task-time">Completed yesterday</span>
                          <span className="task-category">Research</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="step-info-panel">
                <h4>Visualize Your Progress</h4>
                <p>Track your productivity with beautiful, easy-to-understand metrics and charts. Watch your progress grow in real-time and celebrate your accomplishments.</p>
                <ul className="step-info-features">
                  <li>📊 Intuitive productivity charts</li>
                  <li>🏆 Achievement celebrations</li>
                  <li>📈 Trend analysis over time</li>
                  <li>🔔 Smart completion reminders</li>
                </ul>
                <div className="mockup-info">
                  <p><strong>Pro tip:</strong> Review your weekly stats each Friday to plan more effectively for the upcoming week.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="workflow-bottom">
          <div className="workflow-cta">
            <h3>Ready to simplify your task management?</h3>
            <a href="/register" className="workflow-button">Get Started Free</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;