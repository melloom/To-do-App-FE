import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToElementCentered } from '../../../utils/scrollUtils';
import '../styles/AboutHeader.css';

const AboutHeader = ({ activeTab, setActiveTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete project proposal',
      due: 'Today',
      completed: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Schedule team meeting',
      due: 'Today',
      completed: true,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Pick up groceries',
      due: 'Tomorrow',
      completed: false,
      priority: 'low'
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState('');

  // Update to handle tab changes with centered scrolling
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    scrollToElementCentered(tab, { offset: 60 });
  };

  const handleOpenDemo = () => {
    setIsModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsModalOpen(false);
    setShowForm(false);
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskItem = {
        id: Date.now(),
        title: newTask,
        due: 'Tomorrow',
        completed: false,
        priority: 'medium'
      };
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
      setShowForm(false);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    
    // Navigate to home and scroll to top
    navigate('/');
    
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <header className="about-header">
      <div className="about-header-top">
        <a 
          href="/" 
          className="home-button"
          onClick={handleHomeClick}
        >
          <span className="home-icon">🏠</span>
          <span>Back to Home</span>
        </a>
      </div>

      <div className="about-header-content">
        <h1>About Tasklio</h1>
        <p className="about-tagline">
          A secure, cloud-based task manager that helps you organize
          your life with reliable data synchronization across all devices.
        </p>
      </div>

      <nav className="about-nav">
        <button
          className={`tab-button ${activeTab === 'vision' ? 'active' : ''}`}
          onClick={() => handleTabClick('vision')}
        >
          <span className="tab-icon">🔍</span>
          <span className="tab-text">Our Vision</span>
        </button>

        <button
          className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => handleTabClick('features')}
        >
          <span className="tab-icon">✨</span>
          <span className="tab-text">Features</span>
        </button>

        <button
          className={`tab-button ${activeTab === 'developer' ? 'active' : ''}`}
          onClick={() => handleTabClick('developer')}
        >
          <span className="tab-icon">👨‍💻</span>
          <span className="tab-text">Developer</span>
        </button>

        <button
          className={`tab-button ${activeTab === 'roadmap' ? 'active' : ''}`}
          onClick={() => handleTabClick('roadmap')}
        >
          <span className="tab-icon">🗺️</span>
          <span className="tab-text">Roadmap</span>
        </button>

        <button
          className={`tab-button ${activeTab === 'codebase' ? 'active' : ''}`}
          onClick={() => handleTabClick('codebase')}
        >
          <span className="tab-icon">📊</span>
          <span className="tab-text">Codebase</span>
        </button>

        <button
          className={`tab-button ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => handleTabClick('demo')}
        >
          <span className="tab-icon">🎮</span>
          <span className="tab-text">Demo</span>
        </button>
      </nav>

      {/* Decorative elements */}
      <div className="header-decoration header-shape-1"></div>
      <div className="header-decoration header-shape-2"></div>

      {/* Full-Screen Demo Modal */}
      {isModalOpen && (
        <div className="demo-modal-overlay">
          <div className="fullscreen-demo-modal">
            <div className="demo-modal-header">
              <div className="demo-app-logo">
                <img src="/favicon.ico" alt="Tasklio" className="demo-logo-favicon" />
                <span className="demo-logo-icon">✓</span>
                <span className="demo-logo-text">Tasklio</span>
              </div>

              <div className="demo-mode-indicator">Interactive Demo</div>

              <button className="modal-close-btn" onClick={handleCloseDemo}>×</button>
            </div>

            <div className="demo-app-container">
              {/* Sidebar */}
              <div className="demo-sidebar">
                <div className="demo-user-profile">
                  <div className="demo-avatar">
                    <span>JD</span>
                  </div>
                  <div className="demo-user-info">
                    <div className="demo-user-name">John Doe</div>
                    <div className="demo-user-email">john@example.com</div>
                  </div>
                </div>

                <nav className="demo-nav">
                  <div className="demo-nav-section">
                    <h3 className="demo-nav-title">Main</h3>
                    <ul className="demo-nav-list">
                      <li className="demo-nav-item active">
                        <span className="demo-nav-icon">📋</span>
                        <span className="demo-nav-text">Tasks</span>
                      </li>
                      <li className="demo-nav-item">
                        <span className="demo-nav-icon">📅</span>
                        <span className="demo-nav-text">Calendar</span>
                      </li>
                      <li className="demo-nav-item">
                        <span className="demo-nav-icon">📊</span>
                        <span className="demo-nav-text">Analytics</span>
                      </li>
                    </ul>
                  </div>

                  <div className="demo-nav-section">
                    <h3 className="demo-nav-title">Categories</h3>
                    <ul className="demo-nav-list">
                      <li className="demo-nav-item">
                        <span className="demo-category-dot work"></span>
                        <span className="demo-nav-text">Work</span>
                        <span className="demo-category-count">4</span>
                      </li>
                      <li className="demo-nav-item">
                        <span className="demo-category-dot personal"></span>
                        <span className="demo-nav-text">Personal</span>
                        <span className="demo-category-count">2</span>
                      </li>
                      <li className="demo-nav-item">
                        <span className="demo-category-dot health"></span>
                        <span className="demo-nav-text">Health</span>
                        <span className="demo-category-count">1</span>
                      </li>
                    </ul>
                  </div>
                </nav>

                <div className="demo-sidebar-footer">
                  <button className="demo-settings-btn">
                    <span className="demo-settings-icon">⚙️</span>
                    <span>Settings</span>
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="demo-main-content">
                <header className="demo-content-header">
                  <div className="demo-header-left">
                    <h1 className="demo-page-title">My Tasks</h1>
                    <p className="demo-tasks-subtitle">
                      <span className="demo-date">Today: May 11, 2025</span> ·
                      <span className="demo-task-count">7 tasks total</span>
                    </p>
                  </div>

                  <div className="demo-header-actions">
                    <div className="demo-search-box">
                      <span className="demo-search-icon">🔍</span>
                      <input type="text" placeholder="Search tasks..." className="demo-search-input" />
                    </div>

                    <button className="demo-add-btn" onClick={handleShowForm}>
                      <span>+</span> Add Task
                    </button>
                  </div>
                </header>

                <div className="demo-content-body">
                  <div className="demo-tasks-calendar">
                    <div className="demo-calendar-header">
                      <h3 className="demo-section-title">Calendar</h3>
                      <div className="demo-calendar-controls">
                        <button className="demo-calendar-btn">Week</button>
                        <button className="demo-calendar-btn active">Month</button>
                      </div>
                    </div>

                    <div className="demo-calendar">
                      <div className="demo-calendar-weekdays">
                        <div className="demo-weekday">Sun</div>
                        <div className="demo-weekday">Mon</div>
                        <div className="demo-weekday">Tue</div>
                        <div className="demo-weekday">Wed</div>
                        <div className="demo-weekday">Thu</div>
                        <div className="demo-weekday">Fri</div>
                        <div className="demo-weekday">Sat</div>
                      </div>

                      <div className="demo-calendar-grid">
                        {Array.from({ length: 35 }, (_, i) => {
                          const day = i - 4; // Adjust for month start
                          const isCurrentMonth = day > 0 && day <= 31;
                          const isToday = day === 11;
                          const hasTask = [3, 5, 11, 15, 22, 25].includes(day);
                          const hasMultipleTasks = [11, 15].includes(day);

                          return (
                            <div
                              key={i}
                              className={`demo-calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                            >
                              {isCurrentMonth && (
                                <>
                                  <span className="demo-day-number">{day}</span>
                                  {hasTask && (
                                    <div className={`demo-day-indicator ${hasMultipleTasks ? 'multiple' : ''}`}></div>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="demo-tasks-list">
                    <div className="demo-list-header">
                      <h3 className="demo-section-title">Upcoming Tasks</h3>
                      <div className="demo-view-filters">
                        <button className="demo-view-btn active">All</button>
                        <button className="demo-view-btn">Today</button>
                        <button className="demo-view-btn">Upcoming</button>
                      </div>
                    </div>

                    {tasks.map((task) => (
                      <div
                        className={`demo-task-item ${task.id === 1 ? 'highlighted' : ''} ${task.completed ? 'completed' : ''}`}
                        key={task.id}
                      >
                        <div
                          className={`demo-task-checkbox ${task.completed ? 'completed' : ''}`}
                          onClick={() => toggleTaskComplete(task.id)}
                        ></div>
                        <div className="demo-task-content">
                          <div className="demo-task-title">{task.title}</div>
                          <div className="demo-task-meta">
                            <span className={`demo-task-priority ${task.priority}`}>
                              {task.priority}
                            </span>
                            <span className="demo-task-due">
                              {task.completed ? 'Completed' : `Due: ${task.due}`}
                            </span>
                            {task.labels && (
                              <div className="demo-task-labels">
                                {task.labels.map(label => (
                                  <span key={label} className={`demo-task-label ${label}`}>
                                    {label}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="demo-task-actions">
                          <button className="demo-task-action edit">✏️</button>
                          <button className="demo-task-action delete">🗑️</button>
                        </div>
                      </div>
                    ))}

                    {showForm && (
                      <div className="demo-new-task-form">
                        <input
                          type="text"
                          placeholder="What needs to be done?"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                          autoFocus
                          className="demo-task-input"
                        />
                        <div className="demo-task-form-options">
                          <div className="demo-task-form-option">
                            <span className="demo-option-icon">📅</span>
                            <span>Due Date</span>
                          </div>
                          <div className="demo-task-form-option">
                            <span className="demo-option-icon">🏷️</span>
                            <span>Category</span>
                          </div>
                          <div className="demo-task-form-option">
                            <span className="demo-option-icon">🚩</span>
                            <span>Priority</span>
                          </div>
                        </div>
                        <div className="demo-form-actions">
                          <button onClick={handleAddTask} className="demo-add-task-btn">Add Task</button>
                          <button onClick={() => setShowForm(false)} className="demo-cancel-btn">Cancel</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Task Details */}
              <div className="demo-right-sidebar">
                <div className="demo-task-details">
                  <h3 className="demo-details-title">Task Details</h3>
                  <div className="demo-selected-task">
                    <div className="demo-detail-header">
                      <div className="demo-detail-checkbox completed"></div>
                      <h4 className="demo-detail-title">Complete project proposal</h4>
                    </div>

                    <div className="demo-detail-section">
                      <div className="demo-detail-label">Due Date</div>
                      <div className="demo-detail-value">May 11, 2025 (Today)</div>
                    </div>

                    <div className="demo-detail-section">
                      <div className="demo-detail-label">Priority</div>
                      <div className="demo-detail-value">
                        <span className="demo-priority-badge high">High</span>
                      </div>
                    </div>

                    <div className="demo-detail-section">
                      <div className="demo-detail-label">Category</div>
                      <div className="demo-detail-value">
                        <span className="demo-category-badge work">Work</span>
                      </div>
                    </div>

                    <div className="demo-detail-section">
                      <div className="demo-detail-label">Notes</div>
                      <div className="demo-detail-value demo-notes">
                        Include all research findings and preliminary budget estimates. Make sure to include the timeline section and resource allocation.
                      </div>
                    </div>

                    <div className="demo-detail-section">
                      <div className="demo-detail-label">Subtasks</div>
                      <div className="demo-detail-value">
                        <ul className="demo-subtasks">
                          <li className="demo-subtask">
                            <div className="demo-subtask-checkbox completed"></div>
                            <div className="demo-subtask-text">Research market trends</div>
                          </li>
                          <li className="demo-subtask">
                            <div className="demo-subtask-checkbox completed"></div>
                            <div className="demo-subtask-text">Draft executive summary</div>
                          </li>
                          <li className="demo-subtask">
                            <div className="demo-subtask-checkbox"></div>
                            <div className="demo-subtask-text">Create budget projection</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="demo-instructions">
              <p>This is an interactive demo. Try clicking on checkboxes to mark tasks as completed or use the "Add Task" button.</p>
              <p><strong>Note:</strong> This is a demo with limited functionality. Your changes won't be saved.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AboutHeader;
