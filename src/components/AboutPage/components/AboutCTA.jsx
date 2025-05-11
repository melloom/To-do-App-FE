import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutCTA.css';

const AboutCTA = () => {
  return (
    <div className="about-cta">
      <div className="cta-bg-element cta-element-1"></div>
      <div className="cta-bg-element cta-element-2"></div>

      <div className="cta-content">
        <h2>Ready to simplify your task management?</h2>
        <p>Start using Tasklio today and focus on what really matters</p>

        <div className="cta-actions">
          <Link to="/app" className="cta-button primary">
            <span>Try Tasklio Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </Link>

          <Link to="/" className="cta-button secondary">
            Back to Home
          </Link>
        </div>

        <div className="cta-reminder">
          <div className="reminder-icon">✓</div>
          <p>Always free • No signup required • 100% privacy</p>
        </div>
      </div>
    </div>
  );
};

export default AboutCTA;
