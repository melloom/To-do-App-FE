import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Pricing.css';

const Pricing = () => {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <div className="pricing-badge">No Subscriptions Ever</div>
          <h2>Free Forever, Without Compromise</h2>
          <p>
            Tasklio believes in giving you powerful tools without the price tag. We're changing task management 
            by proving premium features don't require premium pricing.
          </p>
          <div className="pricing-highlight">
            <strong>Most task managers make you pay for advanced features. We give them to you for free.</strong>
          </div>
        </div>

        <div className="pricing-comparison">
          {/* Tasklio Card */}
          <div className="pricing-card tasklio">
            <div className="pricing-card-header">
              <div className="pricing-logo">
                <div className="logo-icon">📋</div>
                <div className="logo-text">Tasklio</div>
              </div>
              <div className="pricing-card-badge">Recommended</div>
            </div>

            <div className="price-tag">
              <span className="price-amount">$0</span>
              <span className="price-period">Forever</span>
            </div>

            <div className="pricing-features">
              <div className="pricing-feature">
                <div className="pricing-feature-icon">✓</div>
                <div className="pricing-feature-text">Unlimited Tasks & Projects</div>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">✓</div>
                <div className="pricing-feature-text">Custom Categories & Tags</div>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">✓</div>
                <div className="pricing-feature-text">Priority Levels & Sorting</div>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">✓</div>
                <div className="pricing-feature-text">Smart Reminders & Due Dates</div>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">✓</div>
                <div className="pricing-feature-text">Secure Cloud Storage & Sync</div>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">✓</div>
                <div className="pricing-feature-text">Enterprise-Grade Security</div>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">✓</div>
                <div className="pricing-feature-text">Cross-Device Synchronization</div>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">✓</div>
                <div className="pricing-feature-text">No Ads or User Tracking</div>
              </div>
              <div className="pricing-feature">
                <div className="pricing-feature-icon">✓</div>
                <div className="pricing-feature-text">Data Backup & Recovery</div>
              </div>
            </div>

            <div className="pricing-cta">
              <Link to="/register" className="cta-button">
                Get Started Free
              </Link>
            </div>
          </div>

          {/* VS Divider */}
          <div className="vs-divider">
            <span>VS</span>
          </div>

          {/* Competitors Card */}
          <div className="pricing-card competitors">
            <div className="pricing-card-header">
              <div className="pricing-logo">
                <div className="logo-icon">💸</div>
                <div className="logo-text">Typical Paid Apps</div>
              </div>
            </div>

            <div className="price-tag">
              <span className="price-amount">$5-15</span>
              <span className="price-period">/month</span>
            </div>

            <div className="pricing-features">
              <div className="pricing-feature limited">
                <div className="pricing-feature-icon">⚠️</div>
                <div className="pricing-feature-text">Limited Tasks (50-100 in Free Tier)</div>
              </div>
              <div className="pricing-feature limited">
                <div className="pricing-feature-icon">⚠️</div>
                <div className="pricing-feature-text">Basic Organizational Tools</div>
              </div>
              <div className="pricing-feature limited">
                <div className="pricing-feature-icon">⚠️</div>
                <div className="pricing-feature-text">Basic Priority Settings</div>
              </div>
              <div className="pricing-feature limited">
                <div className="pricing-feature-icon">⚠️</div>
                <div className="pricing-feature-text">Limited Reminder Features</div>
              </div>
              <div className="pricing-feature negative">
                <div className="pricing-feature-icon">✕</div>
                <div className="pricing-feature-text">Monthly Subscription Required</div>
              </div>
              <div className="pricing-feature negative">
                <div className="pricing-feature-icon">✕</div>
                <div className="pricing-feature-text">Data Collection & Targeted Ads</div>
              </div>
              <div className="pricing-feature negative">
                <div className="pricing-feature-icon">✕</div>
                <div className="pricing-feature-text">Limited Storage & Features</div>
              </div>
              <div className="pricing-feature negative">
                <div className="pricing-feature-icon">✕</div>
                <div className="pricing-feature-text">Premium Features Locked</div>
              </div>
              <div className="pricing-feature negative">
                <div className="pricing-feature-icon">✕</div>
                <div className="pricing-feature-text">Risk of Service Cancellation</div>
              </div>
            </div>

            <div className="pricing-cta">
              <button className="cta-button" disabled style={{opacity: 0.5, cursor: 'not-allowed'}}>
                Why Pay More?
              </button>
            </div>
          </div>
        </div>

        <div className="pricing-question">
          <h3>Why is Tasklio completely free?</h3>
        </div>

        <div className="free-promise">
          <div className="promise-header">
            <h3>Our Promise to You</h3>
            <p>We believe productivity tools should empower everyone, not create financial barriers.</p>
          </div>

          <div className="promise-reasons">
            <div className="promise-reason">
              <div className="reason-icon">🎯</div>
              <div className="reason-content">
                <h4>Mission-Driven</h4>
                <p>We're focused on helping people be more productive, not maximizing profits from subscriptions.</p>
              </div>
            </div>

            <div className="promise-reason">
              <div className="reason-icon">🔒</div>
              <div className="reason-content">
                <h4>Privacy-First</h4>
                <p>We don't sell your data or show ads because your privacy and focus matter more than revenue.</p>
              </div>
            </div>

            <div className="promise-reason">
              <div className="reason-icon">🌍</div>
              <div className="reason-content">
                <h4>Accessible to All</h4>
                <p>Quality task management shouldn't depend on your budget. Everyone deserves powerful productivity tools.</p>
              </div>
            </div>

            <div className="promise-reason">
              <div className="reason-icon">⚡</div>
              <div className="reason-content">
                <h4>Sustainable Model</h4>
                <p>Our efficient architecture and cloud infrastructure allow us to provide premium features sustainably.</p>
              </div>
            </div>

            <div className="promise-reason">
              <div className="reason-icon">🚀</div>
              <div className="reason-content">
                <h4>Innovation Focus</h4>
                <p>Without subscription pressure, we can focus on building truly useful features instead of addictive engagement hooks.</p>
              </div>
            </div>

            <div className="promise-reason">
              <div className="reason-icon">🤝</div>
              <div className="reason-content">
                <h4>Community-Driven</h4>
                <p>Our users' needs guide our development, not shareholders demanding maximum revenue extraction.</p>
              </div>
            </div>
          </div>

          <div className="promise-guarantee">
            <div className="guarantee-seal">
              <div className="seal-icon">🛡️</div>
              <div className="seal-text">Forever Free Guarantee</div>
            </div>
            <p>
              <strong>No hidden costs, no premium tiers, no subscription traps.</strong><br />
              Tasklio will always be completely free with all features included.
            </p>
          </div>
        </div>

        <div className="final-cta">
          <h3>Ready to Experience True Freedom?</h3>
          <p>Join thousands who've discovered that the best task manager doesn't cost a thing.</p>
          <div className="final-cta-buttons">
            <Link to="/register" className="primary-cta-btn">
              Start Using Tasklio Free
            </Link>
            <Link to="/about" className="secondary-cta-btn">
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
