import React, { useState, useEffect, useRef } from 'react';
import '../styles/FeaturesSection.css';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState('tasks');
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRotateRef = useRef(null);
  const userInteractedRef = useRef(false);

  // Features data with all information in one place for better maintainability
  const features = [
    {
      id: 'tasks',
      icon: '📝',
      title: 'Intuitive Task Management',
      description: 'Create, organize, and complete tasks with a clean, distraction-free interface designed for focus',
      benefits: [
        'One-click task creation and completion',
        'Drag and drop for effortless organization',
        'Distraction-free, clean interface',
        'Satisfying visual feedback and animations'
      ],
      mockupContent: (
        <div className="feature-mockup-content task-mockup">
          <div className="mockup-header">
            <div className="mockup-title">My Tasks</div>
            <div className="mockup-actions">
              <div className="mockup-button"></div>
              <div className="mockup-button"></div>
            </div>
          </div>
          <div className="mockup-content">
            <div className="mockup-task completed">
              <div className="mockup-checkbox checked"></div>
              <div className="mockup-task-text">Research competitor apps</div>
            </div>
            <div className="mockup-task highlighted">
              <div className="mockup-checkbox"></div>
              <div className="mockup-task-text">Design landing page</div>
            </div>
            <div className="mockup-task">
              <div className="mockup-checkbox"></div>
              <div className="mockup-task-text">Implement responsive layout</div>
            </div>
            <div className="mockup-task">
              <div className="mockup-checkbox"></div>
              <div className="mockup-task-text">Test on mobile devices</div>
            </div>
            <div className="mockup-add-task">
              <span className="add-icon">+</span>
              <span>Add New Task</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'categories',
      icon: '🏷️',
      title: 'Smart Categories',
      description: 'Organize your tasks with customizable categories and filters to keep everything structured',
      benefits: [
        'Create custom categories with color coding',
        'Filter tasks by category with one click',
        'Visualize task distribution at a glance',
        'Separate work, personal, and other tasks effectively'
      ],
      mockupContent: (
        <div className="feature-mockup-content category-mockup">
          <div className="mockup-sidebar">
            <div className="mockup-sidebar-item active">
              <span className="item-icon">📋</span>
              All Tasks
              <span className="item-count">12</span>
            </div>
            <div className="mockup-sidebar-header">Categories</div>
            <div className="mockup-sidebar-item">
              <span className="category-dot" style={{backgroundColor: '#6366f1'}}></span>
              Work
              <span className="item-count">5</span>
            </div>
            <div className="mockup-sidebar-item">
              <span className="category-dot" style={{backgroundColor: '#10b981'}}></span>
              Personal
              <span className="item-count">4</span>
            </div>
            <div className="mockup-sidebar-item">
              <span className="category-dot" style={{backgroundColor: '#f59e0b'}}></span>
              Shopping
              <span className="item-count">2</span>
            </div>
            <div className="mockup-sidebar-item">
              <span className="category-dot" style={{backgroundColor: '#ef4444'}}></span>
              Health
              <span className="item-count">1</span>
            </div>
            <div className="mockup-add-category">
              <span className="add-icon">+</span>
              <span>Add Category</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'priority',
      icon: '🔍',
      title: 'Priority Levels',
      description: 'Focus on what matters most by assigning importance levels to your tasks',
      benefits: [
        'Set high, medium, or low priority with visual indicators',
        'Sort tasks automatically by importance',
        'Focus view to show only high-priority items',
        'Never miss critical deadlines again'
      ],
      mockupContent: (
        <div className="feature-mockup-content priority-mockup">
          <div className="priority-header">
            <h3>Priority View</h3>
            <div className="priority-filter">
              <span className="priority-filter-item active">All</span>
              <span className="priority-filter-item">High</span>
              <span className="priority-filter-item">Medium</span>
              <span className="priority-filter-item">Low</span>
            </div>
          </div>
          <div className="priority-tasks">
            <div className="mockup-priority high">
              <span className="priority-indicator"></span>
              <span className="priority-text">Client presentation</span>
              <span className="priority-due">Due today</span>
            </div>
            <div className="mockup-priority high">
              <span className="priority-indicator"></span>
              <span className="priority-text">Finalize project proposal</span>
              <span className="priority-due">Due tomorrow</span>
            </div>
            <div className="mockup-priority medium">
              <span className="priority-indicator"></span>
              <span className="priority-text">Weekly team meeting</span>
              <span className="priority-due">In 3 days</span>
            </div>
            <div className="mockup-priority low">
              <span className="priority-indicator"></span>
              <span className="priority-text">Organize digital files</span>
              <span className="priority-due">Next week</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'privacy',
      icon: '🔒',
      title: 'Complete Privacy',
      description: 'Your data stays on your device - no accounts, no tracking, no compromises',
      benefits: [
        'Zero data collection or sharing',
        'No account creation required',
        'All information stored locally on your device',
        'Complete control of your personal data'
      ],
      mockupContent: (
        <div className="feature-mockup-content privacy-mockup">
          <div className="privacy-icon">🔒</div>
          <div className="privacy-message">Your data never leaves your device</div>
          <div className="privacy-illustration">
            <div className="device-icon">💻</div>
            <div className="privacy-shield">
              <div className="shield-icon">🛡️</div>
            </div>
            <div className="cloud-icon crossed-out">☁️</div>
          </div>
          <div className="privacy-details">
            <div className="privacy-detail">
              <span className="privacy-check">✓</span>
              <span>No account required</span>
            </div>
            <div className="privacy-detail">
              <span className="privacy-check">✓</span>
              <span>No tracking or analytics</span>
            </div>
            <div className="privacy-detail">
              <span className="privacy-check">✓</span>
              <span>Local storage only</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Handle feature tab click with debounce to prevent rapid switching
  const handleFeatureClick = (featureId) => {
    if (activeFeature !== featureId && !isAnimating) {
      userInteractedRef.current = true; // User has interacted, remember this
      setIsAnimating(true);
      setActiveFeature(featureId);

      // Reset animation state after transition completes
      setTimeout(() => setIsAnimating(false), 500);

      // Reset auto-rotation timer after user interaction
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
        startAutoRotation(10000); // Restart with longer delay after user interaction
      }
    }
  };

  // Auto-cycle through features if user hasn't interacted
  const startAutoRotation = (interval = 8000) => {
    autoRotateRef.current = setInterval(() => {
      if (!isAnimating && !userInteractedRef.current) {
        const featureIds = features.map(f => f.id);
        const currentIndex = featureIds.indexOf(activeFeature);
        const nextIndex = (currentIndex + 1) % featureIds.length;

        setIsAnimating(true);
        setActiveFeature(featureIds[nextIndex]);
        setTimeout(() => setIsAnimating(false), 500);
      } else if (userInteractedRef.current) {
        // If user has interacted, gradually reset the flag after some time
        // This allows auto-rotation to resume if user leaves the page idle
        setTimeout(() => {
          userInteractedRef.current = false;
        }, 30000); // Reset after 30 seconds of inactivity
      }
    }, interval);

    return autoRotateRef.current;
  };

  // Set up auto-rotation on component mount and clean up on unmount
  useEffect(() => {
    const rotationTimer = startAutoRotation();

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, []);

  // Find the currently active feature
  const activeFeatureData = features.find(f => f.id === activeFeature);

  return (
    <section className="about-features-section" id="about-features">
      <div className="features-header">
        <span className="features-badge">Powerful Yet Simple</span>
        <h2>Everything You Need, Nothing You Don't</h2>
        <p className="features-intro">
          Tasklio focuses on the essential features that make task management effective,
          without the bloat and complexity of other apps.
        </p>
      </div>

      <div className="features-tabs-container">
        <div className="features-tabs">
          {features.map(feature => (
            <div
              key={feature.id}
              className={`feature-tab ${activeFeature === feature.id ? 'active' : ''}`}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <div className="feature-tab-icon">{feature.icon}</div>
              <div className="feature-tab-title">{feature.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="feature-showcase">
        <div className="feature-content">
          <h3>{activeFeatureData.title}</h3>
          <p className="feature-description">{activeFeatureData.description}</p>

          <ul className="feature-benefits">
            {activeFeatureData.benefits.map((benefit, index) => (
              <li key={index}>
                <span className="benefit-checkmark">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="feature-visual">
          <div className={`feature-mockup-container feature-${activeFeature}`}>
            {activeFeatureData.mockupContent}
          </div>
        </div>
      </div>

      <div className="features-footer">
        <div className="features-badge special">
          <span className="badge-icon">✨</span>
          <span className="badge-text">All features available for free, forever</span>
        </div>

        <a href="/app" className="try-now-button">
          Try Tasklio Now
          <span className="arrow-icon">→</span>
        </a>
      </div>
    </section>
  );
};

export default FeaturesSection;
