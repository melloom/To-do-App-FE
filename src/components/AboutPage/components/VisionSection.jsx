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
          <div className="principle-card">
            <div className="principle-icon">🎯</div>
            <h4>Simplicity First</h4>
            <p>No feature bloat or unnecessary complexity</p>
            <div className="principle-card-decoration"></div>
          </div>
          <div className="principle-card">
            <div className="principle-icon">🔒</div>
            <h4>Privacy by Design</h4>
            <p>Your data stays on your device, always</p>
            <div className="principle-card-decoration"></div>
          </div>
          <div className="principle-card">
            <div className="principle-icon">⚡</div>
            <h4>Performance Matters</h4>
            <p>Fast, responsive, and reliable</p>
            <div className="principle-card-decoration"></div>
          </div>
          <div className="principle-card">
            <div className="principle-icon">👐</div>
            <h4>Free Forever</h4>
            <p>No premium features or hidden costs</p>
            <div className="principle-card-decoration"></div>
          </div>
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
