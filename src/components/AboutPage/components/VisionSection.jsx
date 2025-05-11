import React from 'react';
import { ReactComponent as VisionSVG } from '../assets/vision-illustration.svg';
import '../styles/VisionSection.css';

const VisionSection = () => {
  // Since we can't create actual SVG files, we'll simulate them with a placeholder component
  const VisionIllustration = () => (
    <div className="vision-illustration">
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9"/>
          </linearGradient>
        </defs>
        <path d="M50,250 Q200,50 350,250" stroke="url(#grad1)" strokeWidth="10" fill="none"/>
        <circle cx="50" cy="250" r="20" fill="#6366f1"/>
        <circle cx="200" cy="80" r="30" fill="#818cf8"/>
        <circle cx="350" cy="250" r="20" fill="#8b5cf6"/>
        <text x="180" y="40" fontFamily="Arial" fontSize="16" fill="#4f46e5">Vision Path</text>
      </svg>
    </div>
  );

  return (
    <section className="vision-section">
      <div className="vision-content">
        <div className="vision-text">
          <h2>Our Vision</h2>
          <p className="vision-intro">
            Tasklio was born from a single question: <span className="highlight">Why are task managers so complicated?</span>
          </p>
          <p>
            The mission was simple: create a task manager that gets out of your way and lets you focus on what really matters -
            completing your tasks, not spending hours organizing them.
          </p>
          <p>
            I believe task management should be accessible to everyone, which is why Tasklio is
            completely <span className="highlight">free</span>, <span className="highlight">privacy-focused</span>, and
            <span className="highlight"> straightforward</span> to use.
          </p>

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
          </div>
          <div className="principle-card">
            <div className="principle-icon">🔒</div>
            <h4>Privacy by Design</h4>
            <p>Your data stays on your device, always</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">⚡</div>
            <h4>Performance Matters</h4>
            <p>Fast, responsive, and reliable</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">👐</div>
            <h4>Free Forever</h4>
            <p>No premium features or hidden costs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
