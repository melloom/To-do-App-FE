import React from 'react';
import '../styles/DeveloperSection.css';

const DeveloperSection = () => {
  // Timeline of the project development
  const timeline = [
    { day: 'Day 1-2', title: 'Research & Concept', description: 'Researched existing solutions and defined core features' },
    { day: 'Day 3-5', title: 'Design & Prototyping', description: 'Created wireframes and visual design in Figma' },
    { day: 'Day 6-10', title: 'Frontend Development', description: 'Built the React components and base functionality' },
    { day: 'Day 11-12', title: 'Data Management', description: 'Implemented local storage and data persistence' },
    { day: 'Day 13-14', title: 'Testing & Launch', description: 'Fixed bugs, tested on different devices, and launched' }
  ];

  // Technologies used
  const technologies = [
    { name: 'React', icon: '⚛️', color: '#61dafb' },
    { name: 'JavaScript', icon: '📜', color: '#f7df1e' },
    { name: 'CSS3', icon: '🎨', color: '#264de4' },
    { name: 'HTML5', icon: '📄', color: '#e34f26' },
    { name: 'LocalStorage', icon: '💾', color: '#6366f1' },
    { name: 'Git', icon: '📊', color: '#f05032' }
  ];

  return (
    <section className="developer-section">
      <div className="developer-intro">
        <div className="developer-photo">
          <div className="developer-avatar">👨‍💻</div>
          <div className="developer-shape shape-1"></div>
          <div className="developer-shape shape-2"></div>
        </div>
        <div className="developer-bio">
          <h2>Developer</h2>
          <p className="developer-tagline">
            Hi, I'm Melvin Peralta, a junior developer passionate about creating useful web applications.
          </p>
          <p>
            I built this To-do App as part of my journey to become a better developer, focusing on
            creating a clean, intuitive experience that helps people stay organized.
          </p>
          <p>
            As I continue to grow as a developer, I'm committed to building tools that solve real problems
            and improve daily workflows without unnecessary complexity.
          </p>
          <div className="dev-stats">
            <div className="dev-stat">
              <div className="stat-number">2</div>
              <div className="stat-label">Weeks</div>
            </div>
            <div className="dev-stat">
              <div className="stat-number">1</div>
              <div className="stat-label">Developer</div>
            </div>
            <div className="dev-stat">
              <div className="stat-number">0</div>
              <div className="stat-label">Funding</div>
            </div>
          </div>
        </div>
      </div>

      <div className="development-timeline">
        <h3>The 14-Day Build</h3>
        <div className="timeline">
          <div className="timeline-line"></div>
          {timeline.map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-day">
                {item.day}
              </div>
              <div className="timeline-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="development-principles">
        <h3>Development Approach</h3>
        <div className="principles-grid">
          <div className="principle-item">
            <div className="principle-icon">🔒</div>
            <h4>Privacy by Design</h4>
            <p>All data stays on your device with no tracking or analytics</p>
          </div>
          <div className="principle-item">
            <div className="principle-icon">⚡</div>
            <h4>Performance First</h4>
            <p>Optimized rendering with virtualized lists and memoization</p>
          </div>
          <div className="principle-item">
            <div className="principle-icon">♿</div>
            <h4>Accessible to All</h4>
            <p>WCAG compliant with keyboard navigation and screen reader support</p>
          </div>
          <div className="principle-item">
            <div className="principle-icon">📱</div>
            <h4>Responsive Design</h4>
            <p>Optimized UX across all devices from mobile to desktop</p>
          </div>
        </div>
      </div>

      <div className="tech-stack">
        <h3>Tech Stack</h3>
        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <div className="tech-item" key={index} style={{'--tech-color': tech.color}}>
              <div className="tech-icon">{tech.icon}</div>
              <div className="tech-name">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="developer-quote">
        <blockquote>
          "I believe that creating simple, accessible tools can have a big impact on people's productivity.
          This project represents my dedication to learning and growing as a developer."
        </blockquote>
      </div>
    </section>
  );
};

export default DeveloperSection;
