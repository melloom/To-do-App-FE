import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmail } from '../../firebase/auth';
import { useUser } from '../../contexts/UserContext';
import './styles/Register.css';
import RegistrationMockups from './components/RegistrationMockups';

const RegisterPage = () => {
  // Form state management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    color: '#5b5ef4',
    agreeToTerms: false,
    // New fields for Discovery step
    referralSource: '',
    referralCode: '',
    usagePurpose: '',
    // New fields for Profile step
    username: '',
    bio: '',
    profileVisibility: 'public'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [formIsDirty, setFormIsDirty] = useState(false);

  const { user, loginUser } = useUser();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Predefined avatar colors
  const colors = [
    '#5b5ef4', // indigo
    '#10b981', // emerald
    '#ec4899', // pink
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#06b6d4', // cyan
    '#475569'  // slate
  ];

  // Referral sources for dropdown
  const referralSources = [
    'Search Engine',
    'Social Media',
    'Friend or Colleague',
    'Advertisement',
    'Blog or Article',
    'Other'
  ];

  // Usage purposes for dropdown
  const usagePurposes = [
    'Personal Task Management',
    'Work Projects',
    'Student Assignments',
    'Team Collaboration',
    'Event Planning',
    'Other'
  ];

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  // Add warning when user tries to leave the page with unsaved changes
  useEffect(() => {
    if (formIsDirty && currentStep > 1) {
      const handleBeforeUnload = (e) => {
        const message = "You haven't completed your registration. Your information won't be saved. Are you sure you want to leave?";
        e.returnValue = message;
        return message;
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [formIsDirty, currentStep]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Mark form as dirty when user makes changes
    setFormIsDirty(true);

    // Clear specific error when user corrects it
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Password strength check
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  // Get password strength label
  const getStrengthLabel = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  // Get password strength color
  const getStrengthColor = () => {
    if (passwordStrength === 1) return '#ef4444';
    if (passwordStrength === 2) return '#f59e0b';
    if (passwordStrength === 3) return '#10b981';
    if (passwordStrength === 4) return '#3b82f6';
    return '#e5e7eb';
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };

  // Validate Step 1 (Account Information)
  const validateStep1 = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'Please enter your first name';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Please enter your last name';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    return errors;
  };

  // Validate Step 2 (Security)
  const validateStep2 = () => {
    const errors = {};

    if (!formData.password) {
      errors.password = 'Please create a password';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    return errors;
  };

  // Validate Step 3 (Discovery)
  const validateStep3 = () => {
    const errors = {};

    if (!formData.referralSource) {
      errors.referralSource = 'Please select how you found us';
    }

    if (!formData.usagePurpose) {
      errors.usagePurpose = 'Please select your primary usage';
    }

    return errors;
  };

  // Validate Step 4 (Profile)
  const validateStep4 = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Please create a username';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (formData.bio && formData.bio.length > 160) {
      errors.bio = 'Bio must be 160 characters or less';
    }

    return errors;
  };

  // Handle next step button with leave warning
  const handleNextStep = (e) => {
    e.preventDefault();

    let errors = {};

    // Validate current step before proceeding
    if (currentStep === 1) {
      errors = validateStep1();
    } else if (currentStep === 2) {
      errors = validateStep2();
    } else if (currentStep === 3) {
      errors = validateStep3();
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      shakeForm();
      return;
    }

    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle previous step button with warning if needed
  const handlePrevStep = (e) => {
    e.preventDefault();

    // If we're beyond step 2, show warning before going back
    if (currentStep > 2) {
      setPendingAction(() => () => {
        setCurrentStep(prev => prev - 1);
      });
      setShowLeaveWarning(true);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Handle confirming or canceling an action after warning
  const handleConfirmAction = (confirm) => {
    if (confirm && pendingAction) {
      pendingAction();
    }
    setPendingAction(null);
    setShowLeaveWarning(false);
  };

  // Handle navigating away from registration
  const handleLeaveRegistration = () => {
    navigate('/');
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateStep4();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      shakeForm();
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        color: formData.color,
        username: formData.username,
        bio: formData.bio || '',
        profileVisibility: formData.profileVisibility,
        referralSource: formData.referralSource,
        usagePurpose: formData.usagePurpose,
        referralCode: formData.referralCode || '',
        registrationComplete: true // Add this flag to indicate complete registration
      };

      await registerWithEmail(formData.email, formData.password, userData);
      loginUser(userData);

      // Navigate to app after successful registration
      navigate('/app');
    } catch (error) {
      console.error("Registration error:", error);

      // Handle duplicate account errors
      if (error.code === 'auth/email-already-in-use') {
        setFormErrors({
          auth: 'This email is already registered. Please log in instead or use a different email.'
        });
      } else {
        setFormErrors({
          auth: error.message || 'Registration failed. Please try again.'
        });
      }

      setIsSubmitting(false);
      shakeForm();
    }
  };

  // Animate form shake on error
  const shakeForm = () => {
    if (formRef.current) {
      formRef.current.classList.add('form-shake');
      setTimeout(() => {
        formRef.current.classList.remove('form-shake');
      }, 500);
    }
  };

  // Get user initial for avatar - keep this for use elsewhere
  const userInitial = formData.firstName ? formData.firstName[0].toUpperCase() : 'T';

  // When reaching profile step, suggest a username based on first and last name
  useEffect(() => {
    if (currentStep === 4 && !formData.username && formData.firstName && formData.lastName) {
      // Generate username suggestion based on first and last name
      const suggestedUsername = `${formData.firstName.toLowerCase()}_${formData.lastName.toLowerCase()}`;
      setFormData(prev => ({
        ...prev,
        username: suggestedUsername
      }));
    }
  }, [currentStep, formData.firstName, formData.lastName, formData.username]);

  // Add a new function to handle navigation away from the form
  const handleNavigateAway = (e) => {
    // Only show warning if user has entered data and is on step 2 or higher
    if (currentStep >= 2 ||
        (formData.firstName?.trim() ||
        formData.lastName?.trim() ||
        formData.email?.trim())) {
      e.preventDefault();
      setShowLeaveWarning(true);
    }
  };

  // Add useEffect for handling browser back button
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (currentStep >= 2 ||
          (formData.firstName?.trim() ||
          formData.lastName?.trim() ||
          formData.email?.trim())) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentStep, formData]);

  return (
    <div className="register-page">
      {showLeaveWarning && (
        <div className="leave-warning-overlay">
          <div className="leave-warning-modal">
            <div className="warning-icon">⚠️</div>
            <h3>Registration Not Complete</h3>
            <p>
              Going back will reset this step's information. You'll need to re-enter it if you proceed.
            </p>
            <div className="warning-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowLeaveWarning(false)}
              >
                Stay Here
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowLeaveWarning(false);
                  navigate('/');
                }}
              >
                Go Back Anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left side - Registration Form */}
      <div className="register-form-container">
        <div className="auth-header">
          <Link to="/" className="back-to-home" onClick={handleNavigateAway}>
            <span className="back-icon">←</span>
            <span>Back to Home</span>
          </Link>
          <div className="brand-logo">
            {/* Remove logo image and text */}
          </div>
        </div>

        <div className="form-progress-container">
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Account</div>
            </div>
            <div className="progress-line">
              <div className={`progress-line-fill ${currentStep >= 2 ? 'active' : ''}`}></div>
            </div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Security</div>
            </div>
            <div className="progress-line">
              <div className={`progress-line-fill ${currentStep >= 3 ? 'active' : ''}`}></div>
            </div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Discovery</div>
            </div>
            <div className="progress-line">
              <div className={`progress-line-fill ${currentStep >= 4 ? 'active' : ''}`}></div>
            </div>
            <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
              <div className="step-number">4</div>
              <div className="step-label">Profile</div>
            </div>
          </div>
        </div>

        {formErrors.auth && (
          <div className="auth-error-message">
            <span className="error-icon">!</span>
            {formErrors.auth}
          </div>
        )}

        <div className="register-form-wrapper" ref={formRef}>
          {currentStep === 1 ? (
            <form className="register-form step-1-form">
              <h1 className="form-title">Create your account</h1>
              <p className="form-subtitle">Let's get started with your free Tasklio account</p>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-input ${formErrors.firstName ? 'error' : ''}`}
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.firstName && <div className="input-error">{formErrors.firstName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-input ${formErrors.lastName ? 'error' : ''}`}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.lastName && <div className="input-error">{formErrors.lastName}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${formErrors.email ? 'error' : ''}`}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.email && <div className="input-error">{formErrors.email}</div>}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-next"
                  onClick={handleNextStep}
                >
                  Continue
                  <span className="btn-icon">→</span>
                </button>
              </div>
            </form>
          ) : currentStep === 2 ? (
            <form className="register-form step-2-form">
              <h1 className="form-title">Security Details</h1>
              <p className="form-subtitle">Create a secure password for your account</p>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form-input ${formErrors.password ? 'error' : ''}`}
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  >
                    {passwordVisible ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {formErrors.password && <div className="input-error">{formErrors.password}</div>}

                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`strength-bar ${i < passwordStrength ? 'active' : ''}`}
                          style={{ backgroundColor: i < passwordStrength ? getStrengthColor() : undefined }}
                        ></div>
                      ))}
                    </div>
                    <div className="strength-label" style={{ color: getStrengthColor() }}>
                      {getStrengthLabel()}
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-input ${formErrors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    aria-label={confirmPasswordVisible ? 'Hide password' : 'Show password'}
                  >
                    {confirmPasswordVisible ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {formErrors.confirmPassword && <div className="input-error">{formErrors.confirmPassword}</div>}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className={formErrors.agreeToTerms ? 'error' : ''}
                  />
                  <span className="checkbox-text">
                    I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                  </span>
                </label>
                {formErrors.agreeToTerms && <div className="input-error terms-error">{formErrors.agreeToTerms}</div>}
              </div>

              <div className="security-note">
                <div className="security-icon">🛡️</div>
                <p>Your information is securely encrypted and we never share your data with third parties.</p>
              </div>

              <div className="form-actions double">
                <button
                  type="button"
                  className="btn btn-secondary btn-back"
                  onClick={handlePrevStep}
                >
                  <span className="btn-icon">←</span>
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-next"
                  onClick={handleNextStep}
                >
                  Continue
                  <span className="btn-icon">→</span>
                </button>
              </div>

              <div className="form-actions secondary-actions">
                <button
                  type="button"
                  className="btn btn-text"
                  onClick={() => {
                    setPendingAction(() => () => {
                      handleLeaveRegistration();
                    });
                    setShowLeaveWarning(true);
                  }}
                >
                  Cancel Registration
                </button>
              </div>
            </form>
          ) : currentStep === 3 ? (
            <form className="register-form step-3-form">
              <h1 className="form-title">How Did You Find Us?</h1>
              <p className="form-subtitle">Help us understand how we can reach more people like you</p>

              <div className="form-group">
                <label htmlFor="referralSource">How did you hear about Tasklio?</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔍</span>
                  <select
                    id="referralSource"
                    name="referralSource"
                    className={`form-input ${formErrors.referralSource ? 'error' : ''}`}
                    value={formData.referralSource}
                    onChange={handleChange}
                  >
                    <option value="">Please select...</option>
                    {referralSources.map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
                {formErrors.referralSource && <div className="input-error">{formErrors.referralSource}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="referralCode">Referral Code (Optional)</label>
                <div className="input-wrapper">
                  <span className="input-icon">🎟️</span>
                  <input
                    type="text"
                    id="referralCode"
                    name="referralCode"
                    className="form-input"
                    placeholder="Enter referral code if you have one"
                    value={formData.referralCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="usagePurpose">How do you plan to use Tasklio?</label>
                <div className="input-wrapper">
                  <span className="input-icon">🎯</span>
                  <select
                    id="usagePurpose"
                    name="usagePurpose"
                    className={`form-input ${formErrors.usagePurpose ? 'error' : ''}`}
                    value={formData.usagePurpose}
                    onChange={handleChange}
                  >
                    <option value="">Please select...</option>
                    {usagePurposes.map(purpose => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                </div>
                {formErrors.usagePurpose && <div className="input-error">{formErrors.usagePurpose}</div>}
              </div>

              <div className="discovery-note">
                <div className="discovery-icon">📊</div>
                <p>This information helps us improve our service and tailor it to better meet your needs.</p>
              </div>

              <div className="form-actions double">
                <button
                  type="button"
                  className="btn btn-secondary btn-back"
                  onClick={handlePrevStep}
                >
                  <span className="btn-icon">←</span>
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-next"
                  onClick={handleNextStep}
                >
                  Continue
                  <span className="btn-icon">→</span>
                </button>
              </div>

              <div className="form-actions secondary-actions">
                <button
                  type="button"
                  className="btn btn-text"
                  onClick={() => {
                    setPendingAction(() => () => {
                      handleLeaveRegistration();
                    });
                    setShowLeaveWarning(true);
                  }}
                >
                  Cancel Registration
                </button>
              </div>
            </form>
          ) : (
            <form className="register-form step-4-form" onSubmit={handleSubmit}>
              <h1 className="form-title">Create Your Profile</h1>
              <p className="form-subtitle">Personalize your Tasklio experience</p>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <span className="input-icon">@</span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-input ${formErrors.username ? 'error' : ''}`}
                    placeholder="Choose a unique username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.username && <div className="input-error">{formErrors.username}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio (Optional)</label>
                <div className="input-wrapper textarea-wrapper">
                  <textarea
                    id="bio"
                    name="bio"
                    className={`form-input ${formErrors.bio ? 'error' : ''}`}
                    placeholder="Tell us a little about yourself"
                    value={formData.bio}
                    onChange={handleChange}
                    maxLength="160"
                    rows="3"
                  ></textarea>
                </div>
                <div className="character-count">
                  {formData.bio ? formData.bio.length : 0}/160
                </div>
                {formErrors.bio && <div className="input-error">{formErrors.bio}</div>}
              </div>

              <div className="form-group">
                <label>Profile Visibility</label>
                <div className="radio-options">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="profileVisibility"
                      value="public"
                      checked={formData.profileVisibility === 'public'}
                      onChange={handleChange}
                    />
                    <span className="radio-text">
                      <span className="radio-option-icon">🌐</span>
                      Public
                    </span>
                    <span className="radio-description">Anyone can see your profile</span>
                  </label>

                  <label className="radio-label">
                    <input
                      type="radio"
                      name="profileVisibility"
                      value="private"
                      checked={formData.profileVisibility === 'private'}
                      onChange={handleChange}
                    />
                    <span className="radio-text">
                      <span className="radio-option-icon">🔒</span>
                      Private
                    </span>
                    <span className="radio-description">Only you can see your profile</span>
                  </label>
                </div>
              </div>

              <div className="profile-preview">
                <h3>Profile Preview</h3>
                <div className="profile-card">
                  <div className="profile-header">
                    <div className="profile-avatar" style={{ backgroundColor: formData.color }}>
                      {userInitial}
                    </div>
                    <div className="profile-info">
                      <div className="profile-name">{`${formData.firstName} ${formData.lastName}` || 'Your Name'}</div>
                      <div className="profile-username">@{formData.username || 'username'}</div>
                    </div>
                  </div>
                  <div className="profile-bio">
                    {formData.bio || 'Your bio will appear here'}
                  </div>
                </div>
              </div>

              <div className="form-actions double">
                <button
                  type="button"
                  className="btn btn-secondary btn-back"
                  onClick={handlePrevStep}
                >
                  <span className="btn-icon">←</span>
                  Back
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>

              <div className="form-actions secondary-actions">
                <button
                  type="button"
                  className="btn btn-text"
                  onClick={() => {
                    setPendingAction(() => () => {
                      handleLeaveRegistration();
                    });
                    setShowLeaveWarning(true);
                  }}
                >
                  Cancel Registration
                </button>
              </div>
            </form>
          )}

          <div className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </div>
        </div>
      </div>

      {/* Right side - Decorative Elements */}
      <div className="auth-decoration">
        <RegistrationMockups />
      </div>
    </div>
  );
};

export default RegisterPage;
