import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmail, signInWithGoogle, resetPassword } from '../../firebase/auth';
import { useUser } from '../../contexts/UserContext';
import './styles/AuthPages.css';
import './styles/Register.css';
import './styles/additionalRegister.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    color: '#5b5ef4',
    goals: [], // New field for user goals
    otherGoal: '', // For custom goal entry
    usageFrequency: '', // How often they plan to use the app
    hearAboutUs: '' // How they heard about the app
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { user, loginUser } = useUser() || { user: null, loginUser: () => {} };
  const navigate = useNavigate();

  const colors = [
    '#5b5ef4', '#38bdf8', '#f59e0b',
    '#10b981', '#ef4444', '#8b5cf6',
    '#ec4899', '#6b7280'
  ];

  // Goal options
  const goalOptions = [
    'Improve productivity',
    'Better organize my tasks',
    'Track work assignments',
    'Manage personal projects',
    'Track habits',
    'Collaborate with others',
    'Other'
  ];

  // Frequency options
  const frequencyOptions = [
    'Daily',
    'Several times a week',
    'Weekly',
    'Occasionally'
  ];

  // Referral source options
  const referralOptions = [
    'Search engine',
    'Social media',
    'Friend recommendation',
    'Blog or article',
    'Advertisement',
    'Other'
  ];

  // Redirect if already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        if (user) {
          navigate('/app');
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error in navigation/auth check:", error);
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [user, navigate]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*]/.test(password)) strength += 1;

    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Update password strength when password changes
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear errors when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      color
    });
  };

  const handleGoalChange = (goal) => {
    const currentGoals = [...formData.goals];
    
    if (currentGoals.includes(goal)) {
      // Remove goal if already selected
      setFormData({
        ...formData,
        goals: currentGoals.filter(g => g !== goal)
      });
    } else {
      // Add goal if not already selected
      setFormData({
        ...formData,
        goals: [...currentGoals, goal]
      });
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateStep1 = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    return errors;
  };

  const validateStep2 = () => {
    const errors = {};

    // Basic validation for the goals step
    if (formData.goals.length === 0) {
      errors.goals = 'Please select at least one goal';
    }

    if (formData.goals.includes('Other') && !formData.otherGoal.trim()) {
      errors.otherGoal = 'Please specify your goal';
    }

    if (!formData.usageFrequency) {
      errors.usageFrequency = 'Please select how often you plan to use Tasklio';
    }

    return errors;
  };

  const validateStep3 = () => {
    const errors = {};

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      errors.password = 'Password must contain at least one special character (!@#$%^&*)';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleNextStep = () => {
    let errors = {};
    
    if (currentStep === 1) {
      errors = validateStep1();
    } else if (currentStep === 2) {
      errors = validateStep2();
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateStep3();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        color: formData.color,
        username: formData.username,
        goals: formData.goals.filter(goal => goal !== 'Other' || formData.otherGoal.trim()),
        otherGoal: formData.goals.includes('Other') ? formData.otherGoal : '',
        usageFrequency: formData.usageFrequency,
        hearAboutUs: formData.hearAboutUs,
      };

      // Register the user with Firebase authentication
      const result = await registerWithEmail(formData.email, formData.password, userData);
      
      if (result && result.user) {
        console.log('User registered successfully:', result.user);
        loginUser(result.user);
        navigate('/app');
      } else {
        throw new Error("Registration failed - invalid response");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setFormErrors({
        auth: error.message || 'Failed to create account. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
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
      console.error("Reset password error:", error);
      setFormErrors({
        resetEmail: error.message || 'Failed to send reset email. Please try again.'
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);

    try {
      const result = await signInWithGoogle();
      if (result && result.user) {
        loginUser(result.user);
        navigate('/app');
      } else {
        throw new Error("Google sign-in failed - invalid response");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setFormErrors({
        auth: error.message || 'Failed to register with Google.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const userInitial = formData.firstName ? formData.firstName[0].toUpperCase() : '?';

  if (isLoading) {
    return (
      <div className="auth-page">
        <div className="auth-loading">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container register-container">
        <div className="auth-header">
          <div className="back-to-home">
            <Link to="/" className="back-button">
              <span className="back-icon">←</span>
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="auth-logo">
            <img src="/favicon-32x32.png" alt="Tasklio Logo" className="auth-logo-favicon" />
            <h2>Tasklio</h2>
          </div>
        </div>

        <div className="auth-content-wrapper">
          <div className="auth-content">
            <h1>Create Your Account</h1>
            <p className="auth-subtitle">Join Tasklio for free and start managing your tasks</p>

            {formErrors.auth && (
              <div className="auth-error-banner">
                {formErrors.auth}
              </div>
            )}

            <div className="register-steps">
              <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>1</div>
              <div className="step-divider"></div>
              <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>2</div>
              <div className="step-divider"></div>
              <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''}`}>3</div>
            </div>

            <div className="step-content-container">
              <div className={`step-content ${currentStep === 1 ? 'active' : ''}`}>
                <button
                  onClick={handleGoogleSignIn}
                  className="google-auth-button"
                  disabled={isSubmitting}
                >
                  <span className="google-icon">G</span>
                  Continue with Google
                </button>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                  <div className="name-row">
                    <div className="form-group half">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className="auth-input"
                      />
                      {formErrors.firstName && <div className="auth-error">{formErrors.firstName}</div>}
                    </div>
                    <div className="form-group half">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="auth-input"
                      />
                      {formErrors.lastName && <div className="auth-error">{formErrors.lastName}</div>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      className="auth-input"
                    />
                    {formErrors.username && <div className="auth-error">{formErrors.username}</div>}
                  </div>

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

                  <div className="auth-buttons">
                    <button type="submit" className="auth-button primary-button">
                      Continue
                    </button>
                  </div>
                  
                  <div className="login-redirect">
                    <p>
                      Already have an account? <Link to="/signin" className="auth-link">Log in</Link>
                    </p>
                  </div>
                </form>
              </div>

              <div className={`step-content ${currentStep === 2 ? 'active' : ''}`}>
                <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
                  <h3 className="step-title">Tell us about your goals</h3>
                  <p className="step-description">This helps us customize your experience</p>
                  
                  <div className="form-group">
                    <label>What do you hope to achieve with Tasklio? (Select all that apply)</label>
                    <div className="checkbox-group">
                      {goalOptions.map((goal) => (
                        <div key={goal} className="checkbox-option">
                          <label className={`checkbox-label ${formData.goals.includes(goal) ? 'selected' : ''}`}>
                            <input 
                              type="checkbox"
                              checked={formData.goals.includes(goal)}
                              onChange={() => handleGoalChange(goal)}
                              className="checkbox-input"
                            />
                            <span className="checkbox-text">{goal}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {formErrors.goals && <div className="auth-error">{formErrors.goals}</div>}
                  </div>

                  {formData.goals.includes('Other') && (
                    <div className="form-group">
                      <label htmlFor="otherGoal">Please specify your goal:</label>
                      <input
                        type="text"
                        id="otherGoal"
                        name="otherGoal"
                        value={formData.otherGoal}
                        onChange={handleChange}
                        placeholder="Enter your specific goal"
                        className="auth-input"
                      />
                      {formErrors.otherGoal && <div className="auth-error">{formErrors.otherGoal}</div>}
                    </div>
                  )}

                  <div className="form-group">
                    <label>How often do you plan to use Tasklio?</label>
                    <div className="radio-group">
                      {frequencyOptions.map((option) => (
                        <div key={option} className="radio-option">
                          <label className={`radio-label ${formData.usageFrequency === option ? 'selected' : ''}`}>
                            <input 
                              type="radio"
                              name="usageFrequency"
                              value={option}
                              checked={formData.usageFrequency === option}
                              onChange={handleRadioChange}
                              className="radio-input"
                            />
                            <span className="radio-text">{option}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {formErrors.usageFrequency && <div className="auth-error">{formErrors.usageFrequency}</div>}
                  </div>

                  <div className="form-group">
                    <label>How did you hear about us?</label>
                    <select
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleChange}
                      className="auth-select"
                    >
                      <option value="" disabled>Select an option</option>
                      {referralOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="auth-buttons">
                    <button type="submit" className="auth-button primary-button">
                      Continue
                    </button>
                    <button
                      type="button"
                      className="auth-button secondary-button"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>

              <div className={`step-content ${currentStep === 3 ? 'active' : ''}`}>
                <form onSubmit={handleSubmit}>
                  <div className="avatar-preview">
                    <div
                      className="avatar"
                      style={{ backgroundColor: formData.color }}
                    >
                      {userInitial}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Choose Your Color</label>
                    <div className="color-grid">
                      {colors.map((color) => (
                        <div
                          key={color}
                          className={`color-option ${formData.color === color ? 'selected' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color)}
                        >
                          {formData.color === color && <span className="color-check">✓</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-field">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create password (min. 8 characters)"
                        className="auth-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex="-1"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    {formErrors.password && <div className="auth-error">{formErrors.password}</div>}
                    <div className="password-strength">
                      <div className="strength-meter">
                        <div
                          className={`strength-bar ${
                            passwordStrength === 0 ? "" :
                            passwordStrength === 1 ? "weak" :
                            passwordStrength === 2 ? "medium" :
                            passwordStrength === 3 ? "strong" : "very-strong"
                          }`}
                          style={{ width: `${passwordStrength * 25}%` }}
                        ></div>
                      </div>
                      <div className="strength-text">
                        {passwordStrength === 0 && formData.password && "Very weak"}
                        {passwordStrength === 1 && "Weak"}
                        {passwordStrength === 2 && "Medium"}
                        {passwordStrength === 3 && "Strong"}
                        {passwordStrength === 4 && "Very strong"}
                      </div>
                    </div>
                    <div className="password-requirements">
                      <div className={`requirement ${formData.password.length >= 8 ? 'met' : ''}`}>
                        ✓ At least 8 characters
                      </div>
                      <div className={`requirement ${/[A-Z]/.test(formData.password) ? 'met' : ''}`}>
                        ✓ At least one uppercase letter
                      </div>
                      <div className={`requirement ${/[0-9]/.test(formData.password) ? 'met' : ''}`}>
                        ✓ At least one number
                      </div>
                      <div className={`requirement ${/[!@#$%^&*]/.test(formData.password) ? 'met' : ''}`}>
                        ✓ At least one special character (!@#$%^&*)
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-field">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="auth-input"
                      />
                    </div>
                    {formErrors.confirmPassword && <div className="auth-error">{formErrors.confirmPassword}</div>}
                  </div>

                  <div className="auth-buttons">
                    <button
                      type="submit"
                      className={`auth-button primary-button ${isSubmitting ? 'loading' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <button
                      type="button"
                      className="auth-button secondary-button"
                      onClick={() => setCurrentStep(2)}
                      disabled={isSubmitting}
                    >
                      Back
                    </button>
                  </div>
                  <div className="forgot-password-container">
                    <button
                      type="button"
                      className="forgot-password-link"
                      onClick={() => setResetPasswordMode(true)}
                    >
                      Forgot your password?
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Reset Password Section */}
              {resetPasswordMode && (
                <div className="reset-password-form">
                  {resetEmailSent ? (
                    <div className="reset-success">
                      <div className="success-icon">✓</div>
                      <h3>Reset Link Sent</h3>
                      <p>We've sent a password reset link to <strong>{resetEmail}</strong>. Please check your email.</p>
                      <button
                        className="back-to-registration-btn"
                        onClick={() => {
                          setResetPasswordMode(false);
                          setResetEmailSent(false);
                        }}
                      >
                        Back to Registration
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3>Reset Your Password</h3>
                      <p>Enter your email address and we'll send you a link to reset your password.</p>
                      <form onSubmit={handleResetPassword}>
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
                            onClick={() => setResetPasswordMode(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              )}

          </div>

          <div className="auth-footer">
            {/* Login link moved to first step */}
          </div>
        </div>
      </div>

      <div className="auth-decoration">
        <div className="auth-illustration register-illustration">
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
          <div className="welcome-message">
            <div className="welcome-bubble">
              <div className="welcome-icon">👋</div>
              <div className="welcome-text">Welcome to Tasklio!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
