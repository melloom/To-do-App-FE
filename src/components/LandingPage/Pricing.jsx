import React from 'react';

const Pricing = () => {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <div className="pricing-badge">100% Free Forever</div>
          <h2>What Others Charge For, We Offer Free</h2>
          <p>
            Tasklio provides premium task management features without the premium price tag. 
            No subscriptions, no hidden fees, no limitations.
          </p>
        </div>
        
        <div className="pricing-comparison">
          <div className="pricing-card tasklio">
            <div className="pricing-card-header">
              <div className="pricing-logo">📋 Tasklio</div>
              <div className="pricing-price">$0</div>
              <div className="pricing-period">Forever Free</div>
            </div>
            <div className="pricing-features">
              <div className="pricing-feature">
                <span className="pricing-feature-icon">✓</span>
                <span className="pricing-feature-text">Unlimited Tasks</span>
              </div>
              <div className="pricing-feature">
                <span className="pricing-feature-icon">✓</span>
                <span className="pricing-feature-text">Task Categories</span>
              </div>
              <div className="pricing-feature">
                <span className="pricing-feature-icon">✓</span>
                <span className="pricing-feature-text">Priority Levels</span>
              </div>
              <div className="pricing-feature">
                <span className="pricing-feature-icon">✓</span>
                <span className="pricing-feature-text">Due Dates & Reminders</span>
              </div>
              <div className="pricing-feature">
                <span className="pricing-feature-icon">✓</span>
                <span className="pricing-feature-text">Complete Privacy</span>
              </div>
              <div className="pricing-feature">
                <span className="pricing-feature-icon">✓</span>
                <span className="pricing-feature-text">No Ads or Tracking</span>
              </div>
            </div>
          </div>
          
          <div className="pricing-card competitors">
            <div className="pricing-card-header">
              <div className="pricing-logo">Typical Competitors</div>
              <div className="pricing-price">$5-15</div>
              <div className="pricing-period">Per Month</div>
            </div>
            <div className="pricing-features">
              <div className="pricing-feature premium">
                <span className="pricing-feature-icon">$</span>
                <span className="pricing-feature-text">Limited Tasks (Free Tier)</span>
              </div>
              <div className="pricing-feature premium">
                <span className="pricing-feature-icon">$</span>
                <span className="pricing-feature-text">Basic Organization</span>
              </div>
              <div className="pricing-feature premium">
                <span className="pricing-feature-icon">$</span>
                <span className="pricing-feature-text">Limited Priority Options</span>
              </div>
              <div className="pricing-feature premium">
                <span className="pricing-feature-icon">$</span>
                <span className="pricing-feature-text">Premium Reminder Features</span>
              </div>
              <div className="pricing-feature negative">
                <span className="pricing-feature-icon">✕</span>
                <span className="pricing-feature-text">Cloud Storage (Privacy Risk)</span>
              </div>
              <div className="pricing-feature negative">
                <span className="pricing-feature-icon">✕</span>
                <span className="pricing-feature-text">Ads or Data Collection</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pricing-callout">
          Why pay for less control and less privacy?
        </div>
        
        <h3 className="reasons-title">Why Tasklio Is Completely Free</h3>
        <div className="reasons-grid">
          <div className="reason-card">
            <span className="reason-icon">❤️</span>
            <h4>Made With Passion</h4>
            <p>Created by developers who believe task management should be accessible to everyone.</p>
          </div>
          
          <div className="reason-card">
            <span className="reason-icon">🛡️</span>
            <h4>Privacy First</h4>
            <p>We don't collect your data, so we don't need to monetize it. Your information stays on your device.</p>
          </div>
          
          <div className="reason-card">
            <span className="reason-icon">💪</span>
            <h4>Community Supported</h4>
            <p>Maintained by users who value simplicity and privacy in productivity tools.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
