import React from 'react';
import './styles/Pricing.css';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <div className="pricing-badge">No Subscriptions Ever</div>
          <h2>Free Forever, Without Compromise</h2>
          <p>
            Tasklio believes in giving you powerful tools without the price tag.
            We're changing task management by proving premium features don't require premium pricing.
          </p>
        </div>

        <div className="pricing-highlight">
          <span className="highlight-text">
            Most task managers make you pay for advanced features.
            We give them to you for free.
          </span>
        </div>

        <div className="pricing-comparison-wrapper">
          <div className="price-tag-decoration">
            <div className="price-tag">
              <span className="price-amount">$0</span>
              <span className="price-period">Forever</span>
            </div>
          </div>

          <div className="pricing-comparison">
            <div className="pricing-card tasklio">
              <div className="pricing-card-header">
                <div className="pricing-logo">
                  <span className="logo-icon">📋</span>
                  <span className="logo-text">Tasklio</span>
                </div>
                <div className="pricing-card-badge">Recommended</div>
              </div>
              <div className="pricing-features">
                <div className="pricing-feature">
                  <span className="pricing-feature-icon">✓</span>
                  <span className="pricing-feature-text">Unlimited Tasks & Projects</span>
                </div>
                <div className="pricing-feature">
                  <span className="pricing-feature-icon">✓</span>
                  <span className="pricing-feature-text">Custom Categories & Tags</span>
                </div>
                <div className="pricing-feature">
                  <span className="pricing-feature-icon">✓</span>
                  <span className="pricing-feature-text">Priority Levels & Sorting</span>
                </div>
                <div className="pricing-feature">
                  <span className="pricing-feature-icon">✓</span>
                  <span className="pricing-feature-text">Smart Reminders & Due Dates</span>
                </div>
                <div className="pricing-feature">
                  <span className="pricing-feature-icon">✓</span>
                  <span className="pricing-feature-text">100% Private Local Storage</span>
                </div>
                <div className="pricing-feature">
                  <span className="pricing-feature-icon">✓</span>
                  <span className="pricing-feature-text">No Ads or User Tracking</span>
                </div>
              </div>
              <div className="pricing-cta">
                <Link to="/register" className="cta-button">Get Started Free</Link>
              </div>
            </div>

            <div className="vs-divider">
              <span>VS</span>
            </div>

            <div className="pricing-card competitors">
              <div className="pricing-card-header">
                <div className="pricing-logo">
                  <span className="logo-text">Typical Paid Apps</span>
                </div>
                <div className="pricing-price">$5-15<span>/month</span></div>
              </div>
              <div className="pricing-features">
                <div className="pricing-feature limited">
                  <span className="pricing-feature-icon">⚠️</span>
                  <span className="pricing-feature-text">Limited Tasks (50-100 in Free Tier)</span>
                </div>
                <div className="pricing-feature limited">
                  <span className="pricing-feature-icon">⚠️</span>
                  <span className="pricing-feature-text">Basic Organizational Tools</span>
                </div>
                <div className="pricing-feature limited">
                  <span className="pricing-feature-icon">⚠️</span>
                  <span className="pricing-feature-text">Basic Priority Settings</span>
                </div>
                <div className="pricing-feature limited">
                  <span className="pricing-feature-icon">⚠️</span>
                  <span className="pricing-feature-text">Limited Reminder Features</span>
                </div>
                <div className="pricing-feature negative">
                  <span className="pricing-feature-icon">✕</span>
                  <span className="pricing-feature-text">Required Cloud Storage (Privacy Risk)</span>
                </div>
                <div className="pricing-feature negative">
                  <span className="pricing-feature-icon">✕</span>
                  <span className="pricing-feature-text">Data Collection & Targeted Ads</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pricing-question">
          <h3>Why would you pay for less?</h3>
        </div>

        <div className="free-promise">
          <div className="promise-header">
            <h3>Our Free Forever Promise</h3>
            <p>Tasklio will always remain 100% free. Here's why:</p>
          </div>

          <div className="reasons-grid">
            <div className="reason-card">
              <span className="reason-icon">❤️</span>
              <h4>Built With Purpose</h4>
              <p>Created by Alexander Wright and Sophia Lin, who believe productivity tools should be accessible to everyone, not just those who can afford them.</p>
            </div>

            <div className="reason-card">
              <span className="reason-icon">🛡️</span>
              <h4>Privacy as a Right</h4>
              <p>We reject the data harvesting business model. Your tasks and personal information remain private and stored only on your device.</p>
            </div>

            <div className="reason-card">
              <span className="reason-icon">💪</span>
              <h4>Community Driven</h4>
              <p>Supported by a thriving community of 10,000+ users who contribute, suggest features, and help others experience truly free productivity.</p>
            </div>
          </div>
        </div>

        <div className="pricing-testimonial">
          <blockquote>
            "I switched from a $10/month task manager to Tasklio and got more features for free. It's shocking how much better the free option is."
          </blockquote>
          <cite>— Jamie Rivera, Marketing Director</cite>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
