import React from 'react';
import '../styles/VisionSection.css';

const VisionSection = () => {
  // Enhanced illustration with more visual elements
  const VisionIllustration = () => (
    <div className="vision-illustration">
      <div className="vision-graphic">
        <div className="orbit-container">
          <div className="orbit orbit-1">
            <div className="satellite satellite-1">
              <span>🔒</span>
            </div>
          </div>
          <div className="orbit orbit-2">
            <div className="satellite satellite-2">
              <span>⚡</span>
            </div>
          </div>
          <div className="orbit orbit-3">
            <div className="satellite satellite-3">
              <span>🎯</span>
            </div>
          </div>
          <div className="core-circle">
            <span>✓</span>
          </div>
        </div>
      </div>
    </div>
  );

  const principles = [
    {
      icon: '🛡️',
      title: 'Privacy First',
      description: 'Your tasks are yours alone. Everything stays on your device, giving you complete control over your data.'
    },
    {
      icon: '⚡',
      title: 'Simplicity',
      description: 'Focus on what matters. No overwhelming features, no distractions - just clean, intuitive task management.'
    },
    {
      icon: '🎯',
      title: 'Efficiency',
      description: 'Every interaction is designed to save you time. Quick actions, smart defaults, and seamless workflows.'
    },
    {
      icon: '🌱',
      title: 'Sustainable Productivity',
      description: 'Build lasting habits without burnout. Tasklio encourages balanced productivity that grows with you.'
    },
    {
      icon: '🔄',
      title: 'Continuous Evolution',
      description: 'Always improving based on real user needs. Regular updates that enhance your experience without complexity.'
    }
  ];

  return (
    <section className="vision-section">
      <div className="vision-hero">
        <div className="vision-headline-new">
          <div className="vision-title-container">
            <span className="vision-title-icon">🚀</span>
            <h2 className="vision-title-text">The Tasklio Approach</h2>
          </div>
          <p className="vision-subtitle">Redefining productivity through thoughtful design</p>
          <div className="vision-title-underline"></div>
        </div>
      </div>

      <div className="vision-content">
        <div className="vision-text">
          <div className="vision-intro-card">
            <p className="vision-intro">
              Tasklio was born from a single question: <span className="highlight">Why are task managers so complicated?</span>
            </p>
          </div>

          <div className="vision-story">
            <p>
              The mission was simple: create a task manager that gets out of your way and lets you focus on what really matters -
              completing your tasks, not spending hours organizing them.
            </p>
            <p>
              I believe task management should be accessible to everyone, which is why Tasklio is
              completely <span className="highlight">free</span>, <span className="highlight">privacy-focused</span>, and
              <span className="highlight"> straightforward</span> to use.
            </p>
          </div>

          <div className="mission-statement">
            <h3>The Mission</h3>
            <blockquote>
              "To create the simplest, most intuitive task management tool that helps
              people focus on what matters most - completing their tasks, not managing them."
            </blockquote>
          </div>
        </div>

        <div className="vision-illustration-container">
          <VisionIllustration />
        </div>
      </div>

      <div className="vision-principles">
        <h3>Guiding Principles</h3>
        <div className="principles-grid">
          {principles.map((principle, index) => (
            <div className="principle-card" key={index}>
              <div className="principle-icon">{principle.icon}</div>
              <h4>{principle.title}</h4>
              <p>{principle.description}</p>
              <div className="principle-card-decoration"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Replace the simple blue-container with a more stylized version */}
      <div className="vision-statement-showcase">
        <div className="vision-statement-card">
          <div className="vision-quote-marks">&ldquo;</div>
          <h3 className="vision-statement-title">Our Philosophy</h3>
          <p className="vision-statement-text">
            <span className="vision-highlight">Tasklio is not just a task manager.</span>
            <br/>
            It's a commitment to <span className="vision-value">simplicity</span>,
            <span className="vision-value">privacy</span>, and
            <span className="vision-value">making your life easier</span>.
          </p>
          <div className="vision-quote-marks closing">&rdquo;</div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
