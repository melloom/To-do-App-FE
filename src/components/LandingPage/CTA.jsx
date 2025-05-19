import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CTA.css';

const CTA = () => {
  return (
    <section className="cta-section" id="cta">
      <div className="cta-container">
        <div className="cta-content">
          <div className="cta-badge">Start Today</div>
          <h2>Transform Your Productivity Journey</h2>
          <p>
            Join thousands of organized professionals who've simplified their workflow and
            reclaimed hours of their day with Tasklio's intuitive task management system.
          </p>

          <div className="cta-benefits">
            <div className="benefit-item">
              <div className="benefit-icon">🔒</div>
              <div className="benefit-text">100% Private & Secure</div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <div className="benefit-text">Boost Productivity</div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🚀</div>
              <div className="benefit-text">Quick Setup</div>
            </div>
          </div>

          <div className="cta-actions">
            <Link to="/register" className="cta-button primary pulse-animation">
              Get Started Free <span className="arrow-icon">→</span>
            </Link>
          </div>

          <div className="cta-guarantee">
            <div className="guarantee-icon">✓</div>
            <div className="guarantee-text">No credit card • Always free • No hidden fees</div>
          </div>

          <div className="cta-testimonial">
            <div className="testimonial-quote">"Tasklio helped me organize my work and stay focused on what matters most."</div>
            <div className="testimonial-author">
              <div className="author-avatar">JD</div>
              <div className="author-info">
                <div className="author-name">Jennifer Davis</div>
                <div className="author-title">Product Designer</div>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
          <div className="decoration-dots"></div>
        </div>
      </div>
    </section>
  );
};

export default CTA;