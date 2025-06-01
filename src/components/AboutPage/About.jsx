import React from 'react';
import SideNavigation from './SideNavigation';
import './styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <SideNavigation />

      <section id="vision" className="about-section">
        <h2>Our Vision</h2>
        {/* Your vision content */}
      </section>

      <section id="features" className="about-section">
        <h2>Features</h2>
        {/* Your features content */}
      </section>

      <section id="developer" className="about-section">
        <h2>Developer</h2>
        {/* Developer content */}
      </section>

      <section id="roadmap" className="about-section">
        <h2>Developer Roadmap</h2>
        <div className="roadmap-container">
          <h3>14-Day Build Timeline</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Day 1-2</div>
              <div className="timeline-content">
                <h4>Planning & Setup</h4>
                <p>Project planning, repository setup, and initial architecture design.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Day 3-5</div>
              <div className="timeline-content">
                <h4>Core Functionality</h4>
                <p>Building the essential task management features and database structure.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Day 6-8</div>
              <div className="timeline-content">
                <h4>User Interface</h4>
                <p>Designing and implementing the responsive front-end components.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Day 9-11</div>
              <div className="timeline-content">
                <h4>Authentication & Security</h4>
                <p>Implementing user authentication, data validation, and security measures.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Day 12-13</div>
              <div className="timeline-content">
                <h4>Testing & Refinement</h4>
                <p>Comprehensive testing, bug fixes, and performance optimization.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Day 14</div>
              <div className="timeline-content">
                <h4>Deployment</h4>
                <p>Final review, documentation, and production deployment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="codebase" className="about-section">
        <h2>Codebase</h2>
        <div className="codebase-overview">
          <p className="codebase-intro">
            Tasklio is built with modern web technologies focused on simplicity,
            usability, and clean code practices. Our codebase is structured to be maintainable and extendable.
          </p>

          <div className="tech-stack-cards">
            <div className="tech-card">
              <div className="tech-icon">⚛️</div>
              <h3>React</h3>
              <p>Component-based UI</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🧩</div>
              <h3>React Hooks</h3>
              <p>Functional state management</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🎨</div>
              <h3>CSS Modules</h3>
              <p>Scoped styling</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🔄</div>
              <h3>LocalStorage</h3>
              <p>Client-side data persistence</p>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="about-section">
        <h2>Demo</h2>
        {/* Your demo content */}
      </section>
    </div>
  );
};

export default About;
