import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmail, resetPassword } from '../../firebase/auth';
import { useUser } from '../../contexts/UserContext';
import { getFirebaseAuthDomainInstructions } from '../../firebase/configHelper';
import './styles/AuthPages.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { user, loginUser } = useUser();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear errors when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signInWithEmail(formData.email, formData.password);
      loginUser(result.userData);
      navigate('/app');
    } catch (error) {
      console.error("Login error:", error);
      setFormErrors({
        auth: error.message || 'Failed to log in. Please check your credentials.'
      });
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!resetEmail.trim()) {
      setFormErrors({
        resetEmail: 'Please enter your email address'
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setFormErrors({
        resetEmail: 'Please enter a valid email address'
      });
      return;
    }

    try {
      await resetPassword(resetEmail);
      setResetEmailSent(true);
    } catch (error) {
      setFormErrors({
        resetEmail: error.message || 'Failed to send reset email. Please try again.'
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container login-container">
        <div className="auth-header">
          <Link to="/" className="back-to-home">
            <span className="back-icon">←</span>
            <span>Back to Home</span>
          </Link>
          <div className="auth-logo">
            {/* Remove logo image and text */}
          </div>
        </div>

        <div className="auth-content-wrapper">
          <div className="auth-content">
            <h1>Welcome Back!</h1>
            <p className="auth-subtitle">Log in to access your tasks and stay productive</p>

            {formErrors.auth && (
              <div className="auth-error-banner">
                {formErrors.auth}
                {formErrors.configInstructions && (
                  <pre className="config-instructions">{formErrors.configInstructions}</pre>
                )}
              </div>
            )}

            {showResetPassword ? (
              <div className="reset-password-form">
                {resetEmailSent ? (
                  <div className="reset-success">
                    <div className="success-icon">✓</div>
                    <h3>Reset Link Sent</h3>
                    <p>We've sent a password reset link to <strong>{resetEmail}</strong>. Please check your email.</p>
                    <button
                      className="back-to-login-btn"
                      onClick={() => {
                        setShowResetPassword(false);
                        setResetEmailSent(false);
                      }}
                    >
                      Back to Login
                    </button>
                  </div>
                ) : (
                  <>
                    <p>Enter your email address and we'll send you a link to reset your password.</p>
                    <form onSubmit={handleForgotPassword}>
                      <div className="form-group">
                        <label htmlFor="resetEmail">Email Address</label>
                        <input
                          type="email"
                          id="resetEmail"
                          name="resetEmail"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="auth-input"
                        />
                        {formErrors.resetEmail && <div className="auth-error">{formErrors.resetEmail}</div>}
                      </div>

                      <div className="auth-buttons">
                        <button type="submit" className="auth-button primary-button">
                          Send Reset Link
                        </button>
                        <button
                          type="button"
                          className="auth-button secondary-button"
                          onClick={() => setShowResetPassword(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="auth-input"
                    />
                    {formErrors.email && <div className="auth-error">{formErrors.email}</div>}
                  </div>

                  <div className="form-group">
                    <div className="password-label-row">
                      <label htmlFor="password">Password</label>
                      <button
                        type="button"
                        className="forgot-password-link"
                        onClick={() => setShowResetPassword(true)}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="auth-input"
                    />
                    {formErrors.password && <div className="auth-error">{formErrors.password}</div>}
                  </div>

                  <div className="auth-buttons">
                    <button
                      type="submit"
                      className={`auth-button primary-button ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging in...' : 'Log In'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-decoration">
        <div className="auth-illustration">
          <div className="floating-task task-1">
            <div className="task-checkbox completed"></div>
            <div className="task-content">
              <div className="task-title">Finish project</div>
              <div className="task-date">Today</div>
            </div>
          </div>
          <div className="floating-task task-2">
            <div className="task-checkbox"></div>
            <div className="task-content">
              <div className="task-title">Team meeting</div>
              <div className="task-date">Tomorrow</div>
            </div>
          </div>
          <div className="floating-task task-3">
            <div className="task-checkbox completed"></div>
            <div className="task-content">
              <div className="task-title">Send report</div>
              <div className="task-date">Yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
