import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmail, signInWithGoogle } from '../../firebase/auth';
import { useUser } from '../../contexts/UserContext';
import TermsOfServiceModal from '../../components/common/TermsOfServiceModal';
import PrivacyPolicyModal from '../../components/common/PrivacyPolicyModal';
import './styles/AuthPages.css';
import './styles/Register.css';
import './styles/additionalRegister.css';

const RegisterPage = () => {
  const { user, isLoading: userContextLoading } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleSignInData, setGoogleSignInData] = useState(null);  // Add state for Google sign-in data
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    color: '#5b5ef4',
    goals: [],
    usageFrequency: '',
    hearAboutUs: ''
  });

  // Colors for user profile
  const colors = [
    '#5b5ef4', '#38bdf8', '#f59e0b',
    '#10b981', '#ef4444', '#8b5cf6',
    '#ec4899', '#6b7280'
  ];

  // Redirect if already logged in
  useEffect(() => {
    if (user && !userContextLoading) {
      navigate('/app');
    } else {
      setIsLoading(false);
    }
  }, [user, userContextLoading, navigate]);

  // Password strength checker
  useEffect(() => {
    const calculatePasswordStrength = (password) => {
      if (!password) return 0;

      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;

      return strength;
    };

    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };

  const handleGoalSelect = (goal) => {
    const updatedGoals = formData.goals.includes(goal)
      ? formData.goals.filter(g => g !== goal)
      : [...formData.goals, goal];

    setFormData(prev => ({
      ...prev,
      goals: updatedGoals
    }));
  };

  // Modified validateStep to handle Google sign-in case
  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      // Skip validation for step 1 if Google sign-in
      if (googleSignInData) return errors;

      if (!formData.firstName.trim())
        errors.firstName = "First name is required";

      if (!formData.lastName.trim())
        errors.lastName = "Last name is required";

      if (!formData.email.trim())
        errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        errors.email = "Please enter a valid email address";

      if (!formData.username.trim())
        errors.username = "Username is required";
      else if (formData.username.length < 3)
        errors.username = "Username must be at least 3 characters";
    }

    else if (step === 2) {
      // Skip password validation if using Google sign-in
      if (googleSignInData) {
        if (!agreedToTerms)
          errors.terms = "You must agree to the Terms of Service";
        return errors;
      }

      if (!formData.password)
        errors.password = "Password is required";
      else if (formData.password.length < 8)
        errors.password = "Password must be at least 8 characters";

      if (!formData.confirmPassword)
        errors.confirmPassword = "Please confirm your password";
      else if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "Passwords don't match";

      if (!agreedToTerms)
        errors.terms = "You must agree to the Terms of Service";
    }

    else if (step === 3) {
      // Preferences validation - less strict
      if (formData.goals.length === 0) {
        errors.goals = "Please select at least one goal";
      }
    }

    // Step 4 doesn't need validation as it's just color selection

    return errors;
  };

  const goToNextStep = () => {
    const errors = validateStep(currentStep);

    if (Object.keys(errors).length === 0) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setFormErrors(errors);
    }
  };

  // Modify goToPreviousStep to handle Google sign-in data correctly
  const goToPreviousStep = () => {
    // Keep Google sign-in data even when going back to step 1
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  // Modified to handle Google sign-in data
  const handleGoogleSignUp = async () => {
    setIsSubmitting(true);
    try {
      const result = await signInWithGoogle();

      if (result.isGoogleSignIn) {
        // Store Google sign-in data for later use
        setGoogleSignInData(result);

        // Mark that we have an active Google sign-in in session storage
        // This helps with browser refreshes or direct navigation attempts
        sessionStorage.setItem('googleSignInActive', 'true');

        // Pre-fill the form with Google data
        setFormData(prev => ({
          ...prev,
          firstName: result.googleUserInfo.firstName || '',
          lastName: result.googleUserInfo.lastName || '',
          email: result.googleUserInfo.email || '',
          username: result.user.username || result.googleUserInfo.displayName?.toLowerCase().replace(/\s+/g, '_') || '',
          // No need to set password for Google sign-in
        }));

        // Skip to step 2 as we already have basic info
        setCurrentStep(2);

        // Set the terms to agreed as this is a Google sign-in
        setAgreedToTerms(true);

        setIsSubmitting(false);
      } else {
        // Handle regular Google sign-in if not returning the isGoogleSignIn flag
        // Redirect happens automatically when user context updates
      }
    } catch (error) {
      setFormErrors({
        auth: error.message || "Failed to sign up with Google"
      });
      setIsSubmitting(false);
    }
  };

  // Modified to handle Google sign-in submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateStep(currentStep);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      try {
        // If we have Google sign-in data, use it for registration
        if (googleSignInData) {
          // Update existing Google user with additional information
          await updateUserData(googleSignInData.user.uid, {
            displayName: `${formData.firstName} ${formData.lastName}`,
            username: formData.username,
            color: formData.color,
            goals: formData.goals,
            usageFrequency: formData.usageFrequency,
            hearAboutUs: formData.hearAboutUs
          });

          // Redirect happens automatically when user context updates
        } else {
          // Regular email registration
          await registerWithEmail(
            formData.email,
            formData.password,
            {
              displayName: `${formData.firstName} ${formData.lastName}`,
              username: formData.username,
              color: formData.color,
              goals: formData.goals,
              usageFrequency: formData.usageFrequency,
              hearAboutUs: formData.hearAboutUs
            }
          );
        }
      } catch (error) {
        setFormErrors({
          auth: error.message || "Failed to create account"
        });
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  // Modify this useEffect to handle the beforeunload event with improved detection
  useEffect(() => {
    // Add the event listener if user has passed step 1 OR has Google sign-in data
    if (currentStep > 1 || googleSignInData) {
      const handleBeforeUnload = (e) => {
        // Standard way to show confirmation dialog
        const confirmationMessage = 'You have unsaved registration information. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = confirmationMessage; // Required for Chrome
        return confirmationMessage; // For older browsers
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      // Clean up the event listener when component unmounts
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [currentStep, googleSignInData]);

  // Enhanced navigation guard with improved back button handling
  useEffect(() => {
    // Only add protection if user has passed step 1 OR has Google sign-in data
    if (currentStep > 1 || googleSignInData) {
      // Create a more robust navigation handler
      const handleNavigation = (e) => {
        // We want to show the warning only when leaving the registration page entirely
        // not when navigating between steps
        const confirmationMessage = 'You have unsaved registration information. Are you sure you want to leave?';

        if (!window.confirm(confirmationMessage)) {
          // User chose to stay - prevent navigation
          e.preventDefault();
          // Also push a new history entry to counter the back button
          if (e.type === 'popstate') {
            window.history.pushState(null, '', window.location.pathname);
          }
        } else {
          // User confirmed they want to leave
          // Clear Google sign-in data to prevent state inconsistencies
          setGoogleSignInData(null);
        }
      };

      // Function to handle the back button specifically for step navigation
      const handleBackButton = (e) => {
        // If we're not at step 1 and back button is pressed, navigate to previous step
        if (currentStep > 1) {
          e.preventDefault();
          e.stopPropagation();
          goToPreviousStep();
          // Push current URL again to neutralize the back button action
          window.history.pushState(null, '', window.location.pathname);
          return;
        }

        // If at step 1 with Google data, confirm before losing Google sign-in
        if (currentStep === 1 && googleSignInData) {
          if (!window.confirm('Going back will clear your Google sign-in data. Continue?')) {
            e.preventDefault();
            window.history.pushState(null, '', window.location.pathname);
          } else {
            setGoogleSignInData(null);
          }
        }
      };

      // Listen for back button via the popstate event
      window.addEventListener('popstate', handleBackButton);

      // Add click handlers to navigation links that point outside registration
      const addLinkHandlers = () => {
        const links = document.querySelectorAll('a:not([href^="#"])');
        links.forEach(link => {
          // Skip links that are within form or navigation
          if (!link.closest('form') && !link.classList.contains('monitored-link')) {
            link.classList.add('monitored-link');
            link.addEventListener('click', handleNavigation);
          }
        });
      };

      // Add handlers immediately and also with a delay to catch dynamically added links
      addLinkHandlers();
      const linkCheckInterval = setInterval(addLinkHandlers, 2000);

      // Cleanup function
      return () => {
        window.removeEventListener('popstate', handleBackButton);
        clearInterval(linkCheckInterval);

        // Remove event listeners from all links
        document.querySelectorAll('a.monitored-link').forEach(link => {
          link.removeEventListener('click', handleNavigation);
          link.classList.remove('monitored-link');
        });
      };
    }
  }, [currentStep, googleSignInData, goToPreviousStep]);

  // Update component cleanup to remove session storage item
  useEffect(() => {
    return () => {
      // Clean up session storage when component unmounts
      sessionStorage.removeItem('googleSignInActive');
    };
  }, []);

  // Check for existing Google sign-in session on component mount
  useEffect(() => {
    const hasActiveGoogleSignIn = sessionStorage.getItem('googleSignInActive') === 'true';

    if (hasActiveGoogleSignIn && !googleSignInData) {
      // If we have an active session but no data, warn the user
      const confirmed = window.confirm(
        'It seems you had an active Google sign-up that was interrupted. Would you like to start over?'
      );

      if (confirmed) {
        // Clear the stale session
        sessionStorage.removeItem('googleSignInActive');
      }
    }
  }, [googleSignInData]);

  const openTermsModal = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const openPrivacyModal = (e) => {
    e.preventDefault();
    setShowPrivacyModal(true);
  };

  if (isLoading) {
    return <div className="auth-loading">Loading...</div>;
  }

  // Modify renderStepContent to handle Google sign-in
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2>Create Your Account</h2>
            <p className="step-description">Let's start with your basic information</p>

            <div className="name-row">
              <div className="form-group half">
                <label htmlFor="firstName">First Name</label>
                <div className="input-icon-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    className="auth-input"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.firstName && <div className="auth-error">{formErrors.firstName}</div>}
              </div>

              <div className="form-group half">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-icon-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    className="auth-input"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.lastName && <div className="auth-error">{formErrors.lastName}</div>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-icon-wrapper">
                <span className="input-icon">@</span>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  className="auth-input"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {formErrors.username && <div className="auth-error">{formErrors.username}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-icon-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  className="auth-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {formErrors.email && <div className="auth-error">{formErrors.email}</div>}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2>Secure Your Account</h2>
            <p className="step-description">
              {googleSignInData
                ? "Your account is secured with Google. Please agree to our terms."
                : "Create a strong password to protect your account"}
            </p>

            {!googleSignInData && (
              // Only show password fields for non-Google sign-in
              <>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-field">
                    <div className="input-icon-wrapper">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Create a strong password"
                        className="auth-input"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {formErrors.password && <div className="auth-error">{formErrors.password}</div>}

                  <div className="password-strength-meter">
                    <div className="strength-bars">
                      {[1, 2, 3, 4].map(index => (
                        <div
                          key={index}
                          className={`strength-bar ${index <= passwordStrength ? `level-${passwordStrength}` : ''}`}
                        />
                      ))}
                    </div>
                    <div className="strength-label">
                      {passwordStrength === 0 && "Enter a password"}
                      {passwordStrength === 1 && "Weak"}
                      {passwordStrength === 2 && "Fair"}
                      {passwordStrength === 3 && "Good"}
                      {passwordStrength === 4 && "Strong"}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-icon-wrapper">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="auth-input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors.confirmPassword && <div className="auth-error">{formErrors.confirmPassword}</div>}
                </div>
              </>
            )}

            {googleSignInData && (
              <div className="google-account-info">
                <div className="google-badge">
                  <span className="google-icon">G</span>
                  <span>You're signing up with Google</span>
                </div>
                <p>Your account is secured through Google authentication</p>
              </div>
            )}

            <div className="form-group terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
              />
              <label htmlFor="terms">
                I agree to the <a href="#" onClick={openTermsModal} className="terms-link">Terms of Service</a> and <a href="#" onClick={openPrivacyModal} className="terms-link">Privacy Policy</a>
              </label>
              {formErrors.terms && <div className="auth-error terms-error">{formErrors.terms}</div>}
            </div>

            <div className="security-info">
              <div className="security-badge">
                <span className="security-icon">🛡️</span>
                <span>Your data is secured with end-to-end encryption</span>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2>Customize Your Experience</h2>
            <p className="step-description">Help us tailor Tasklio to your needs</p>

            <div className="form-group">
              <label>What are your goals with Tasklio?</label>
              <p className="sub-label">Select all that apply</p>

              <div className="goals-grid">
                {[
                  { id: 'work', label: 'Work Tasks', icon: '💼' },
                  { id: 'personal', label: 'Personal Projects', icon: '🏠' },
                  { id: 'education', label: 'Study & Learning', icon: '📚' },
                  { id: 'health', label: 'Health & Fitness', icon: '🏃‍♂️' },
                  { id: 'finance', label: 'Financial Goals', icon: '💰' },
                  { id: 'travel', label: 'Travel Planning', icon: '✈️' }
                ].map(goal => (
                  <div
                    key={goal.id}
                    className={`goal-item ${formData.goals.includes(goal.id) ? 'selected' : ''}`}
                    onClick={() => handleGoalSelect(goal.id)}
                  >
                    <span className="goal-icon">{goal.icon}</span>
                    <span className="goal-label">{goal.label}</span>
                    {formData.goals.includes(goal.id) && <span className="goal-check">✓</span>}
                  </div>
                ))}
              </div>
              {formErrors.goals && <div className="auth-error">{formErrors.goals}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="usageFrequency">How often do you plan to use Tasklio?</label>
              <select
                id="usageFrequency"
                name="usageFrequency"
                className="auth-select"
                value={formData.usageFrequency}
                onChange={handleChange}
              >
                <option value="">Please select...</option>
                <option value="daily">Multiple times a day</option>
                <option value="weekdays">Mostly on weekdays</option>
                <option value="weekly">A few times a week</option>
                <option value="occasionally">Occasionally</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="hearAboutUs">How did you hear about us?</label>
              <select
                id="hearAboutUs"
                name="hearAboutUs"
                className="auth-select"
                value={formData.hearAboutUs}
                onChange={handleChange}
              >
                <option value="">Please select...</option>
                <option value="search">Search Engine</option>
                <option value="social">Social Media</option>
                <option value="friend">Friend or Colleague</option>
                <option value="ad">Advertisement</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2>Personalize Your Profile</h2>
            <p className="step-description">Choose your profile color</p>

            <div className="avatar-preview">
              <div className="avatar" style={{ backgroundColor: formData.color }}>
                {formData.firstName ? formData.firstName[0] : '?'}
              </div>
              <p className="avatar-label">Your profile color</p>
            </div>

            <div className="color-grid">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`color-option ${formData.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  aria-label={`Select ${color} as profile color`}
                >
                  {formData.color === color && <span className="color-check">✓</span>}
                </button>
              ))}
            </div>

            <div className="form-group">
              <p className="profile-ready-message">
                <span className="ready-icon">🎉</span>
                Your profile is ready! Click "Create Account" to finish.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

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

        <div className="auth-content">
          <h1>Join Tasklio</h1>
          <p className="auth-subtitle">Create your account and start organizing your life</p>

          {formErrors.auth && (
            <div className="auth-error-banner">{formErrors.auth}</div>
          )}

          <div className="register-steps">
            {[1, 2, 3, 4].map(step => (
              <React.Fragment key={step}>
                <div
                  className={`step-indicator ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                  onClick={() => currentStep > step && setCurrentStep(step)}
                >
                  {currentStep > step ? '✓' : step}
                  <span className="step-label">
                    {step === 1 ? 'Account' :
                     step === 2 ? 'Security' :
                     step === 3 ? 'Preferences' : 'Profile'}
                  </span>
                </div>
                {step < 4 && <div className="step-connector" />}
              </React.Fragment>
            ))}
          </div>

          {/* Only show Google sign-in option on step 1 or if not already signed in with Google */}
          {(currentStep === 1 || !googleSignInData) && (
            <div className="auth-options">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="google-auth-button"
                disabled={isSubmitting}
              >
                <span className="google-icon">G</span>
                {googleSignInData ? "Continue with Google" : "Sign up with Google"}
              </button>

              <div className="auth-divider">
                <span>OR</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="step-buttons">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="previous-button"
                  disabled={isSubmitting}
                >
                  <span className="button-icon">←</span>
                  Back
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="next-button"
                  disabled={isSubmitting}
                >
                  Next
                  <span className="button-icon">→</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login" className="auth-link">Log in</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="auth-decoration">
        <div className="geometric-shape"></div>
        <div className="geometric-shape"></div>
        <div className="particles">
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
        </div>
        <div className="register-illustration">
          <div className="floating-task register-task-1">
            <div className="task-checkbox completed"></div>
            <div className="task-content">
              <div className="task-title">Organize your life</div>
              <div className="task-meta">
                <span className="task-date">Today</span>
                <span className="task-tag productivity">Productivity</span>
              </div>
            </div>
          </div>
          <div className="floating-task register-task-2">
            <div className="task-checkbox"></div>
            <div className="task-content">
              <div className="task-title">Track your progress</div>
              <div className="task-meta">
                <span className="task-date">Daily</span>
                <span className="task-tag growth">Growth</span>
              </div>
            </div>
          </div>
          <div className="floating-task register-task-3">
            <div className="task-checkbox completed"></div>
            <div className="task-content">
              <div className="task-title">Achieve your goals</div>
              <div className="task-meta">
                <span className="task-date">Ongoing</span>
                <span className="task-tag success">Success</span>
              </div>
            </div>
          </div>
          <div className="floating-task register-task-4">
            <div className="task-checkbox"></div>
            <div className="task-content">
              <div className="task-title">Build better habits</div>
              <div className="task-meta">
                <span className="task-date">Weekly</span>
                <span className="task-tag health">Health</span>
              </div>
            </div>
          </div>
          <div className="floating-task register-task-5">
            <div className="task-checkbox"></div>
            <div className="task-content">
              <div className="task-title">Collaborate with team</div>
              <div className="task-meta">
                <span className="task-date">Work</span>
                <span className="task-tag team">Team</span>
              </div>
              <div className="task-avatars">
                <span className="mini-avatar" style={{backgroundColor: "#ef4444"}}>A</span>
                <span className="mini-avatar" style={{backgroundColor: "#10b981"}}>B</span>
                <span className="mini-avatar" style={{backgroundColor: "#8b5cf6"}}>C</span>
              </div>
            </div>
          </div>
          <div className="glowing-orb orb-1"></div>
          <div className="glowing-orb orb-2"></div>
          <div className="glowing-orb orb-3"></div>
          <div className="welcome-message">
            <div className="welcome-bubble">
              <span className="welcome-icon">✨</span>
              <span className="welcome-text">Welcome to Tasklio!</span>
            </div>
          </div>
          <div className="feature-callout">
            <div className="feature-badge">
              <span className="feature-icon">📊</span>
              <span className="feature-text">Smart Task Analytics</span>
            </div>
          </div>
        </div>
      </div>

      <TermsOfServiceModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />

      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </div>
  );
};

export default RegisterPage;
