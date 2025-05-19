<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Workflow.css';
// DeviceMockups.css is imported within Workflow.css

const Workflow = () => {
  // Animation states to track which step is active
  const [activeStep, setActiveStep] = useState(1);
  
  // Auto cycle through steps every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => prev === 3 ? 1 : prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle manual step change
  const handleStepClick = (stepNum) => {
    setActiveStep(stepNum);
  };
  
  return (
    <section className="workflow-section" id="how-it-works">
      {/* Background Effects */}
      <div className="workflow-blur-gradient blue-gradient"></div>
      <div className="workflow-blur-gradient purple-gradient"></div>
      <div className="workflow-dots-pattern"></div>
      
      <div className="workflow-container">
        <div className="workflow-header">
          <div className="workflow-badge">How It Works</div>
          <h2>Simple workflow. Maximum productivity.</h2>
          <p className="workflow-subtitle">Get started in minutes with a simple three-step process that will transform the way you manage tasks.</p>
        </div>
        
        {/* Modern step navigation */}
        <div className="workflow-steps-nav">
          <div className="workflow-progress-track">
            <div 
              className="workflow-progress-fill" 
              style={{ width: `${(activeStep / 3) * 100}%` }}
            ></div>
          </div>
          
          <div className="workflow-nav">
            <button 
              className={`workflow-nav-step ${activeStep === 1 ? 'active' : ''}`} 
              onClick={() => handleStepClick(1)}
              aria-label="View step 1"
            >
              <div className="workflow-step-icon">
                <span>1</span>
                <svg viewBox="0 0 24 24" className="step-icon"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
              </div>
              <span className="workflow-step-label">Capture</span>
            </button>
            
            <button 
              className={`workflow-nav-step ${activeStep === 2 ? 'active' : ''}`} 
              onClick={() => handleStepClick(2)}
              aria-label="View step 2"
            >
              <div className="workflow-step-icon">
                <span>2</span>
                <svg viewBox="0 0 24 24" className="step-icon"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></svg>
              </div>
              <span className="workflow-step-label">Organize</span>
            </button>
            
            <button 
              className={`workflow-nav-step ${activeStep === 3 ? 'active' : ''}`} 
              onClick={() => handleStepClick(3)}
              aria-label="View step 3"
            >
              <div className="workflow-step-icon">
                <span>3</span>
                <svg viewBox="0 0 24 24" className="step-icon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"></path></svg>
              </div>
              <span className="workflow-step-label">Achieve</span>
            </button>
          </div>
        </div>
        
        <div className="workflow-showcase">
          {/* Main visual content area that changes based on active step */}
          <div className="workflow-visual">
            <div className={`workflow-step-visual ${activeStep === 1 ? 'active' : ''}`} id="step1-visual">
              <div className="device-mockup phone-mockup">
                <div className="device-frame">
                  <div className="device-screen">
                    <div className="app-ui task-creation">
                      <div className="app-header">
                        <h3>New Task</h3>
                        <button className="close-btn">×</button>
                      </div>
                      
                      <div className="form-group">
                        <label>Task Title</label>
                        <div className="input-field active">Quarterly team presentation</div>
                      </div>
                      
                      <div className="form-group">
                        <label>Description</label>
                        <div className="input-field textarea">
                          Prepare slides with project updates, metrics and next quarter goals.
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group half">
                          <label>Due Date</label>
                          <div className="input-field with-icon">
                            <i className="icon-calendar">📅</i>
                            <span>May 20, 2025</span>
                          </div>
                        </div>
                        
                        <div className="form-group half">
                          <label>Priority</label>
                          <div className="input-field with-badge">
                            <span className="priority high">High</span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="action-button primary">Create Task</button>
                    </div>
                  </div>
                  <div className="device-stripe"></div>
                  <div className="device-header"></div>
                  <div className="device-sensors"></div>
                </div>
                
                <div className="floating-element categories-floating">
                  <div className="floating-content">
                    <div className="category-chip work">Work</div>
                    <div className="category-chip personal">Personal</div>
                    <div className="category-chip health">Health</div>
                  </div>
                </div>
                
                <div className="floating-element notes-floating">
                  <div className="floating-content">
                    <div className="notes-title">Quick Notes</div>
                    <div className="notes-item">Include quarterly metrics</div>
                    <div className="notes-item">Share competitor analysis</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`workflow-step-visual ${activeStep === 2 ? 'active' : ''}`} id="step2-visual">
              <div className="device-mockup desktop-mockup">
                <div className="device-frame">
                  <div className="device-screen">
                    <div className="app-ui task-organization">
                      <div className="app-sidebar">
                        <div className="sidebar-item active">
                          <i className="sidebar-icon">📌</i>
                          <span>Today</span>
                        </div>
                        <div className="sidebar-item">
                          <i className="sidebar-icon">📅</i>
                          <span>Upcoming</span>
                        </div>
                        <div className="sidebar-item">
                          <i className="sidebar-icon">🔄</i>
                          <span>Recurring</span>
                        </div>
                        <div className="sidebar-item">
                          <i className="sidebar-icon">📂</i>
                          <span>Projects</span>
                        </div>
                        <div className="sidebar-divider"></div>
                        <div className="sidebar-item">
                          <i className="sidebar-icon">📊</i>
                          <span>Analytics</span>
                        </div>
                      </div>
                      
                      <div className="app-main">
                        <div className="main-header">
                          <h3>Today's Tasks</h3>
                          <div className="view-controls">
                            <button className="view-btn active">List</button>
                            <button className="view-btn">Board</button>
                          </div>
                        </div>
                        
                        <div className="filter-bar">
                          <div className="filter-tabs">
                            <button className="filter-tab active">All</button>
                            <button className="filter-tab">Work</button>
                            <button className="filter-tab">Personal</button>
                          </div>
                          <div className="filter-sort">
                            <span>Sort: </span>
                            <select className="sort-select">
                              <option>Priority</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="task-list">
                          <div className="task-item high drag-indicator">
                            <div className="task-checkbox"></div>
                            <div className="task-content">
                              <h4>Quarterly team presentation</h4>
                              <div className="task-meta">
                                <span className="due-time">Today at 2:00 PM</span>
                                <span className="task-tag work">Work</span>
                              </div>
                            </div>
                            <div className="task-priority high"></div>
                            <div className="drag-handle">⋮⋮</div>
                          </div>
                          
                          <div className="task-item medium">
                            <div className="task-checkbox"></div>
                            <div className="task-content">
                              <h4>Review project proposal</h4>
                              <div className="task-meta">
                                <span className="due-time">Today at 4:30 PM</span>
                                <span className="task-tag work">Work</span>
                              </div>
                            </div>
                            <div className="task-priority medium"></div>
                            <div className="drag-handle">⋮⋮</div>
                          </div>
                          
                          <div className="task-item low">
                            <div className="task-checkbox"></div>
                            <div className="task-content">
                              <h4>Schedule doctor appointment</h4>
                              <div className="task-meta">
                                <span className="due-time">Tomorrow</span>
                                <span className="task-tag personal">Personal</span>
                              </div>
                            </div>
                            <div className="task-priority low"></div>
                            <div className="drag-handle">⋮⋮</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="device-bezel"></div>
                </div>
                
                <div className="floating-element organize-floating">
                  <div className="floating-content">
                    <div className="organize-title">Smart Organization</div>
                    <div className="organize-feature">
                      <span className="feature-icon">🔄</span>
                      <span>Drag & Drop</span>
=======
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
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
                    </div>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
            </div>
            
            <div className={`workflow-step-visual ${activeStep === 3 ? 'active' : ''}`} id="step3-visual">
              <div className="device-mockup tablet-mockup">
                <div className="device-frame">
                  <div className="device-screen">
                    <div className="app-ui task-analytics">
                      <div className="analytics-header">
                        <h3>Weekly Performance</h3>
                        <div className="date-navigator">
                          <button className="nav-btn">◀</button>
                          <span className="date-range">May 10-16</span>
                          <button className="nav-btn">▶</button>
                        </div>
                      </div>
                      
                      <div className="stats-row">
                        <div className="stat-card">
                          <div className="stat-number">14</div>
                          <div className="stat-label">Tasks Completed</div>
                          <div className="stat-trend positive">+27%</div>
                        </div>
                        
                        <div className="stat-card">
                          <div className="stat-number">85<span className="percent">%</span></div>
                          <div className="stat-label">Completion Rate</div>
                          <div className="stat-trend positive">+12%</div>
                        </div>
                        
                        <div className="stat-card">
                          <div className="stat-number">93<span className="percent">%</span></div>
                          <div className="stat-label">On-time Rate</div>
                          <div className="stat-trend positive">+5%</div>
                        </div>
                      </div>
                      
                      <div className="chart-container">
                        <h4>Daily Progress</h4>
                        <div className="progress-chart">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <div key={day} className={`chart-column ${day === 'Fri' ? 'active' : ''}`}>
                              <div 
                                className="column-bar" 
                                style={{height: `${[60, 40, 75, 90, 80, 30, 20][i]}%`}}
                              >
                                <div className="column-value">{[60, 40, 75, 90, 80, 30, 20][i]}%</div>
                              </div>
                              <div className="column-label">{day}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="completed-tasks">
                        <div className="section-header">
                          <h4>Recently Completed</h4>
                          <button className="view-all">View All</button>
                        </div>
                        
                        <div className="completed-list">
                          <div className="completed-item">
                            <div className="completion-check">✓</div>
                            <div className="completion-details">
                              <h5>Team presentation</h5>
                              <div className="completion-meta">
                                <span>Completed today</span>
                                <span className="badge">On time</span>
                              </div>
                            </div>
                            <div className="achievement-badge">🏆</div>
                          </div>
                          
                          <div className="completed-item">
                            <div className="completion-check">✓</div>
                            <div className="completion-details">
                              <h5>Review project proposal</h5>
                              <div className="completion-meta">
                                <span>Completed yesterday</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="device-home"></div>
                </div>
                <div className="floating-element achievement-floating">
                  <div className="floating-content">
                    <div className="achievement-icon">🎯</div>
                    <div className="achievement-text">Goal Achieved!</div>
                  </div>
=======
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
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
                </div>
              </div>
            </div>
          </div>
<<<<<<< HEAD
          
          {/* Step descriptions that change based on active step */}
          <div className="workflow-steps-content">
            <div className={`workflow-step-info ${activeStep === 1 ? 'active' : ''}`}>
              <div className="step-icon-container">
                <div className="step-icon">
                  <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                </div>
              </div>
              <div className="step-content">
                <h3>Capture Everything</h3>
                <p>Quickly create detailed tasks with all the information you need. Set deadlines, priorities, and categories in seconds.</p>
                <ul className="step-features">
                  <li>Create tasks with rich details</li>
                  <li>Set precise deadlines & reminders</li>
                  <li>Assign priority levels</li>
                  <li>Organize with custom categories</li>
                </ul>
              </div>
            </div>
            
            <div className={`workflow-step-info ${activeStep === 2 ? 'active' : ''}`}>
              <div className="step-icon-container">
                <div className="step-icon">
                  <svg viewBox="0 0 24 24"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></svg>
                </div>
              </div>
              <div className="step-content">
                <h3>Organize Your Way</h3>
                <p>Take control of your task list with powerful organization tools. Drag and drop to reorder, filter by priority, and customize your view.</p>
                <ul className="step-features">
                  <li>Intuitive drag-and-drop interface</li>
                  <li>Smart filters and sorting options</li>
                  <li>Customizable views and layouts</li>
                  <li>Group related tasks together</li>
                </ul>
              </div>
            </div>
            
            <div className={`workflow-step-info ${activeStep === 3 ? 'active' : ''}`}>
              <div className="step-icon-container">
                <div className="step-icon">
                  <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"></path></svg>
                </div>
              </div>
              <div className="step-content">
                <h3>Achieve More</h3>
                <p>Track your progress and celebrate your achievements. Visualize productivity trends and watch your completion rate soar.</p>
                <ul className="step-features">
                  <li>Visual productivity analytics</li>
                  <li>Achievement celebrations</li>
                  <li>Performance trends over time</li>
                  <li>Goal tracking and streaks</li>
                </ul>
=======

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
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        
        <div className="workflow-cta">
          <div className="workflow-cta-content">
            <h3>Ready to transform your productivity?</h3>
            <p>Join thousands of users who have simplified their workflow with Tasklio.</p>
            <div className="workflow-buttons">
              <Link to="/register" className="workflow-button primary">
                Get Started Free <span className="button-arrow">→</span>
              </Link>
              <a href="#features" className="workflow-button secondary">
                Learn more
              </a>
            </div>
            <div className="workflow-cta-guarantee">
              <span className="guarantee-icon">✓</span>
              <span className="guarantee-text">No credit card • Always free core features</span>
            </div>
          </div>
          <div className="workflow-cta-decoration"></div>
=======

        <div className="workflow-bottom">
          <div className="workflow-cta">
            <h3>Ready to simplify your task management?</h3>
            <a href="/register" className="workflow-button">Get Started Free</a>
          </div>
>>>>>>> 60da6d9d7d046d5fa689256873c26e21d5bad368
        </div>
      </div>
    </section>
  );
};

export default Workflow;