import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setEmail(e.target.value);
    if (formErrors.email) {
      setFormErrors({});
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    return errors;
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const auth = getAuth();
      // Normalize email for consistent handling
      const normalizedEmail = email.trim().toLowerCase();
      await sendPasswordResetEmail(auth, normalizedEmail);
      setResetSent(true);
    } catch (error) {
      console.error("Password reset error:", error);

      if (error.code === 'auth/user-not-found') {
        setFormErrors({
          email: 'No account found with this email address.'
        });
      } else {
        setFormErrors({
          email: error.message
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="auth-header">
          <Link to="/login" className="back-to-login">
            <span className="back-icon">←</span>
            <span>Back to Login</span>
          </Link>
          <div className="brand-logo">
            <div className="logo-icon">T</div>
            <div className="logo-text">Tasklio</div>
          </div>
        </div>

        <div className={`forgot-password-content ${animateIn ? 'animate-in' : ''}`}>
          {!resetSent ? (
            <>
              <h1 className="forgot-password-title">Reset Your Password</h1>
              <p className="forgot-password-subtitle">
                Enter your email address and we'll send you a link to reset your password
              </p>

              <form onSubmit={handleSubmit} className="forgot-password-form">
                <div className="form-group">
                  <label htmlFor="email">
                    <span className="input-icon">✉️</span>
                    Email Address
                  </label>
                  <div className="input-container">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`auth-input ${formErrors.email ? 'error' : ''} ${email ? 'has-value' : ''}`}
                      value={email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      aria-invalid={formErrors.email ? 'true' : 'false'}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                    />
                    {email && !formErrors.email && <span className="input-check">✓</span>}
                  </div>
                  {formErrors.email && (
                    <div className="auth-error" id="email-error" role="alert">
                      {formErrors.email}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`auth-button reset-button ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            <div className="reset-success">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Check Your Email</h2>
              <p className="success-message">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="success-instructions">
                Click the link in the email to reset your password. If you don't see the email, check your spam folder.
              </p>
              <div className="success-actions">
                <button
                  className="auth-button back-button"
                  onClick={() => {
                    setResetSent(false);
                    setEmail('');
                  }}
                >
                  Send to another email
                </button>
                <Link to="/login" className="auth-link">
                  Return to login
                </Link>
              </div>
            </div>
          )}

          <div className="auth-footer">
            <p>
              Remember your password? <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-illustration">
        <div className="illustration-content">
          <div className="illustration-icon">🔑</div>
          <h2>Password Recovery</h2>
          <p>We'll help you get back into your account safely and securely.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;