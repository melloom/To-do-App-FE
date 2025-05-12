import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateUserProfile } from '../../firebase/auth';
import { useUser } from '../../contexts/UserContext';
import './styles/Register.css';

const AccountSetupPage = () => {
  const { user, updateUserData } = useUser();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Form state management
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    color: user?.color || '#5b5ef4',
    // Fields for Discovery step
    referralSource: '',
    referralCode: '',
    usagePurpose: '',
    // Fields for Profile step
    username: user?.username || '',
    bio: user?.bio || '',
    profileVisibility: user?.profileVisibility || 'public'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formIsDirty, setFormIsDirty] = useState(false);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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

    return errors;
  };

  // Validate Step 2 (Discovery)
  const validateStep2 = () => {
    const errors = {};

    if (!formData.referralSource) {
      errors.referralSource = 'Please select how you found us';
    }

    if (!formData.usagePurpose) {
      errors.usagePurpose = 'Please select your primary usage';
    }

    return errors;
  };

  // Validate Step 3 (Profile)
  const validateStep3 = () => {
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

  // Handle next step button
  const handleNextStep = (e) => {
    e.preventDefault();

    let errors = {};

    // Validate current step before proceeding
    if (currentStep === 1) {
      errors = validateStep1();
    } else if (currentStep === 2) {
      errors = validateStep2();
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      shakeForm();
      return;
    }

    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle previous step button
  const handlePrevStep = (e) => {
    e.preventDefault();
    setCurrentStep(prev => prev - 1);
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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateStep3();
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
        color: formData.color,
        username: formData.username,
        bio: formData.bio || '',
        profileVisibility: formData.profileVisibility,
        referralSource: formData.referralSource,
        usagePurpose: formData.usagePurpose,
        referralCode: formData.referralCode || '',
        registrationComplete: true,
        needsProfileCompletion: false
      };

      // Update user profile in Firebase
      await updateUserProfile(userData);

      // Update user data in context
      updateUserData(userData);

      // Navigate to app after successful completion
      navigate('/app');
    } catch (error) {
      console.error("Profile update error:", error);
      setFormErrors({
        auth: error.message || 'Profile update failed. Please try again.'
      });
      setIsSubmitting(false);
      shakeForm();
    }
  };

  // Get user initial for avatar
  const userInitial = formData.firstName ? formData.firstName[0].toUpperCase() : 'T';

  // When reaching profile step, suggest a username based on first and last name
  useEffect(() => {
    if (currentStep === 3 && !formData.username && formData.firstName && formData.lastName) {
      // Generate username suggestion based on first and last name
      const suggestedUsername = `${formData.firstName.toLowerCase()}_${formData.lastName.toLowerCase()}`;
      setFormData(prev => ({
        ...prev,
        username: suggestedUsername
      }));
    }
  }, [currentStep, formData.firstName, formData.lastName, formData.username]);

  return (
    <div className="register-page">
      {/* Left side - Setup Form */}
      <div className="register-form-container">
        <div className="auth-header">
          <Link to="/" className="back-to-home">
            <span className="back-icon">←</span>
            <span>Back to Home</span>
          </Link>
          <div className="brand-logo">
            <img src="/favicon-32x32.png" alt="Tasklio Logo" className="logo-icon-img" />
            <div className="logo-text">Tasklio</div>
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
              <div className="step-label">Discovery</div>
            </div>
            <div className="progress-line">
              <div className={`progress-line-fill ${currentStep >= 3 ? 'active' : ''}`}></div>
            </div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
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
              <h1 className="form-title">Complete Your Account</h1>
              <p className="form-subtitle">Let's get your account set up</p>

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
                <label>Choose your profile color</label>
                <div className="color-options">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-option ${formData.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
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
                  {isSubmitting ? 'Completing Setup...' : 'Complete Setup'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Right side - Decorative Elements */}
      <div className="auth-decoration">
        <div className="setup-illustration">
          <img src="/images/setup-illustration.svg" alt="Complete your profile" className="setup-image" />
          <div className="setup-message">
            <h2>Just a few more steps!</h2>
            <p>Complete your profile to get the most out of Tasklio.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetupPage;
