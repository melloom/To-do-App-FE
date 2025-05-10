// filepath: /workspaces/To-do-App-FE/src/components/LandingPage/CTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CTA.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2>Ready to Take Control of Your Tasks?</h2>
          <p>
            Get started with Tasklio today and experience the difference a 
            simple, privacy-focused task manager can make in your productivity.
          </p>
          <div className="cta-actions">
            <Link to="/app" className="cta-button primary">
              Get Started Free
            </Link>
            <Link to="/about" className="cta-button secondary">
              Learn More
            </Link>
          </div>
          <div className="cta-footnote">
            No credit card required • Free forever • No hidden fees
          </div>
        </div>
        <div className="cta-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </section>
  );
};

export default CTA;