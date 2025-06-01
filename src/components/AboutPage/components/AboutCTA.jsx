import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutCTA.css';

const AboutCTA = () => (
  <section className="about-cta-remake">
    <div className="cta-content">
      <div className="cta-icon">✓</div>
      <h2 className="cta-title">Ready to simplify your task management?</h2>
      <p className="cta-subtitle">
        Start using <span className="cta-brand">Tasklio</span> today and focus on what really matters
      </p>
      <div className="cta-actions">
        <a
          href="/"
          className="cta-primary-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Try Tasklio Now
        </a>
        <Link to="/" className="cta-secondary-btn">
          Back to Home
        </Link>
      </div>
      <div className="cta-footer">
        <span>Always free</span> &bull; <span>No signup required</span> &bull; <span>100% privacy</span>
      </div>
    </div>
  </section>
);

export default AboutCTA;
