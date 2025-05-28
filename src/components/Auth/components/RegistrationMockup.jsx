import React from 'react';
import './RegistrationMockup.css';

const RegistrationMockup = ({ currentStep = 1 }) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="welcome-icon">✨</div>
            <h2 className="welcome-title">Welcome to Tasklio</h2>
            <p className="welcome-subtitle">
              Join thousands of productive people who organize their life with Tasklio
            </p>
            <div className="welcome-stats">
              <div className="welcome-stat">
                <div className="stat-value">50K+</div>
                <div className="stat-desc">Active Users</div>
              </div>
              <div className="welcome-stat">
                <div className="stat-value">1M+</div>
                <div className="stat-desc">Tasks Completed</div>
              </div>
              <div className="welcome-stat">
                <div className="stat-value">99%</div>
                <div className="stat-desc">Satisfaction Rate</div>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="welcome-icon">🎯</div>
            <h2 className="welcome-title">Personalized for You</h2>
            <p className="welcome-subtitle">
              We'll customize your Tasklio experience based on how you plan to use it
            </p>
            <div className="use-case-examples">
              <div className="use-case-card">
                <div className="use-case-icon">💼</div>
                <div className="use-case-content">
                  <div className="use-case-title">Work Projects</div>
                  <div className="use-case-desc">Manage deadlines & collaborate</div>
                </div>
              </div>
              <div className="use-case-card">
                <div className="use-case-icon">📚</div>
                <div className="use-case-content">
                  <div className="use-case-title">Student Life</div>
                  <div className="use-case-desc">Track assignments & schedules</div>
                </div>
              </div>
              <div className="use-case-card">
                <div className="use-case-icon">🏠</div>
                <div className="use-case-content">
                  <div className="use-case-title">Personal Tasks</div>
                  <div className="use-case-desc">Daily routines & household</div>
                </div>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="welcome-icon">🔒</div>
            <h2 className="welcome-title">Your Data is Safe</h2>
            <p className="welcome-subtitle">
              We use enterprise-grade security to protect your information
            </p>
            <div className="security-features">
              <div className="security-feature">
                <div className="security-feature-icon">🛡️</div>
                <div className="security-feature-content">
                  <div className="security-feature-title">End-to-End Encryption</div>
                  <div className="security-feature-desc">Data encrypted in transit & at rest</div>
                </div>
              </div>
              <div className="security-feature">
                <div className="security-feature-icon">🔐</div>
                <div className="security-feature-content">
                  <div className="security-feature-title">Secure Authentication</div>
                  <div className="security-feature-desc">Multi-factor authentication ready</div>
                </div>
              </div>
              <div className="security-feature">
                <div className="security-feature-icon">🏆</div>
                <div className="security-feature-content">
                  <div className="security-feature-title">Industry Standards</div>
                  <div className="security-feature-desc">SOC 2 Type II compliant</div>
                </div>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className="welcome-icon">👤</div>
            <h2 className="welcome-title">Make It Yours</h2>
            <p className="welcome-subtitle">
              Customize your profile and make Tasklio feel like home
            </p>
            <div className="customization-preview">
              <div className="preview-avatar-showcase">
                <div className="showcase-avatar" style={{backgroundColor: '#5b5ef4'}}>JS</div>
                <div className="showcase-avatar" style={{backgroundColor: '#10b981'}}>😎</div>
                <div className="showcase-avatar" style={{backgroundColor: '#ec4899'}}>MK</div>
                <div className="showcase-avatar" style={{backgroundColor: '#f59e0b'}}>🚀</div>
              </div>
              <div className="customization-options">
                <div className="custom-option">
                  <div className="custom-icon">🎨</div>
                  <div className="custom-text">Choose colors & avatars</div>
                </div>
                <div className="custom-option">
                  <div className="custom-icon">📝</div>
                  <div className="custom-text">Write your bio</div>
                </div>
                <div className="custom-option">
                  <div className="custom-icon">🏷️</div>
                  <div className="custom-text">Pick your username</div>
                </div>
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="welcome-icon celebration">🎉</div>
            <h2 className="welcome-title">Welcome Aboard!</h2>
            <p className="welcome-subtitle">
              You're all set to start your productivity journey with Tasklio
            </p>
            <div className="success-celebration">
              <div className="confetti">🎊</div>
              <div className="celebration-message">
                <div className="celebration-title">Account Created Successfully!</div>
                <div className="celebration-desc">Redirecting to your dashboard...</div>
              </div>
              <div className="confetti">🎊</div>
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="welcome-icon">✨</div>
            <h2 className="welcome-title">Welcome to Tasklio</h2>
            <p className="welcome-subtitle">
              Join thousands of productive people who organize their life with Tasklio
            </p>
          </>
        );
    }
  };

  return (
    <div className="registration-mockup">
      {/* Background Elements */}
      <div className="mockup-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Dynamic Welcome Message based on step */}
      <div className={`welcome-message step-${currentStep}`}>
        {renderStepContent()}
      </div>

      {/* Decorative Elements */}
      <div className="decorative-elements">
        <div className="floating-shape shape-1">
          <div className="shape-inner"></div>
        </div>
        <div className="floating-shape shape-2">
          <div className="shape-inner"></div>
        </div>
        <div className="floating-shape shape-3">
          <div className="shape-inner"></div>
        </div>
        <div className="floating-icons">
          <div className="floating-icon icon-1">📅</div>
          <div className="floating-icon icon-2">⚡</div>
          <div className="floating-icon icon-3">🎯</div>
          <div className="floating-icon icon-4">💡</div>
          <div className="floating-icon icon-5">🚀</div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationMockup;
