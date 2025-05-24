import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { saveUserProfile } from '../../firebase/firestore';
import { signInWithGithub } from '../../firebase/Firebase';
import RegistrationMockups from './components/RegistrationMockups';
import ProfilePictureModal from './components/ProfilePictureModal';
import TermsOfServiceModal from '../common/TermsOfServiceModal';
import PrivacyPolicyModal from '../common/PrivacyPolicyModal';

// Import styles
import './styles/RegisterFirebase.css';
import './styles/RegisterFirebase-email-error.css';
import './styles/RegisterFirebase-avatar.css';
import './styles/RegisterFirebase-terms.css';
import './styles/RegisterFirebase-initials.css';
import './styles/RegisterFirebase-modal.css';

const steps = [
  'Account Info',
  'Additional Info',
  'Security',
  'Profile',
  'Finish',
];

const RegisterFirebase = () => {
  const navigate = useNavigate();

  // Form state management
  const [currentStep, setCurrentStep] = useState(1);
  const [activeEmojiCategory, setActiveEmojiCategory] = useState('smileys');
  const [formData, setFormData] = useState({
    // Personal info
    firstName: '',
    lastName: '',
    name: '',
    email: '',

    // Security
    password: '',
    confirmPassword: '',

    // Profile
    username: '',
    color: '#5b5ef4',
    bio: '',
    profileVisibility: 'public',

    // Additional info
    referralCode: '',
    referralSource: '',
    usagePurpose: '',

    // Avatar settings
    avatarType: 'initials', // 'initials', 'emoji', 'image', or 'color'
    avatarEmoji: '😎',
    avatarImage: '',
    avatarTabView: 'initials', // For tracking active tab in avatar modal
  });

  // UI state management
  const [formErrors, setFormErrors] = useState({
    emailHighlight: false // Initialize with false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [isEmailChecking, setIsEmailChecking] = useState(false);

  // Modal state
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Password state
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Refs
  const formRef = useRef(null);

  // Predefined avatar colors - expanded with more options
  const colors = [
    '#5b5ef4', '#10b981', '#ec4899', '#f59e0b', '#ef4444',
    '#8b5cf6', '#06b6d4', '#475569', '#3b82f6', '#0ea5e9',
    '#14b8a6', '#f97316', '#84cc16', '#22c55e', '#d946ef',
    '#6366f1', '#a855f7', '#f43f5e', '#64748b', '#334155', '#1e293b'
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

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Handle step change animation
  useEffect(() => {
    // Reset animation when step changes
    setAnimateIn(false);
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Mark form as modified once user starts entering data
    if (!formModified) {
      setFormModified(true);
    }

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Password strength check
    if (name === 'password') {
      calculatePasswordStrength(value);
    }

    // Validate email as user types
    if (name === 'email' && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setFormErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        // If email looks valid, immediately check if it's already registered
        setIsEmailChecking(true);
        validateEmail(value).then(error => {
          if (error) {
            // Show error message with high visibility
            setFormErrors(prev => ({
              ...prev,
              email: error,
              emailHighlight: true // Add flag for highlighting
            }));
          } else {
            setFormErrors(prev => ({ ...prev, email: '', emailHighlight: false }));
          }
          setIsEmailChecking(false);
        }).catch(err => {
          console.error("Email validation error in handleChange:", err);
          // Set a generic error but continue
          setFormErrors(prev => ({
            ...prev,
            email: 'Error checking email. Please try again.',
            emailHighlight: true
          }));
          setIsEmailChecking(false);
        });
      }
    }

    if (name === 'firstName' || name === 'lastName') {
      setFormData((prev) => ({
        ...prev,
        name: `${name === 'firstName' ? value : prev.firstName} ${name === 'lastName' ? value : prev.lastName}`.trim(),
      }));
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

  // Email validation with exact matching
  const validateEmail = async (email) => {
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';

    // Normalize the email by trimming whitespace and converting to lowercase
    const normalizedEmail = email.trim().toLowerCase();

    try {
      // First check with Firebase Authentication - only exact matches
      const auth = getAuth();
      console.log("Validating email:", normalizedEmail);
      const methods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
      console.log("Authentication check result:", methods);

      if (methods && methods.length > 0) {
        console.log("Email exists in Authentication");
        return 'This email is already registered. Please use a different email or login instead.';
      }

      // Then also check with Firestore (if available) - only exact matches
      try {
        const { checkEmailExists } = await import('../../firebase/firestore');
        if (checkEmailExists) {
          const exists = await checkEmailExists(normalizedEmail);
          console.log("Firestore check result:", exists);
          if (exists) {
            console.log("Email exists in Firestore");
            return 'This email is already registered. Please use a different email or login instead.';
          }
        }
      } catch (firestoreError) {
        console.error("Firestore email check error:", firestoreError);
        // If Firestore gives us an error, be cautious and treat as if email exists
        if (firestoreError.message && firestoreError.message.includes('permission-denied')) {
          return 'Unable to verify email uniqueness. Please try again.';
        }
      }
    } catch (error) {
      console.error("Email validation error:", error);
      if (error.code === 'auth/email-already-in-use') {
        return 'This email is already registered. Please use a different email or login instead.';
      }
      // Any other authentication error should be treated cautiously
      return 'Unable to verify email. Please try again.';
    }

    return '';
  };

  // Check username availability
  const checkIfUsernameExists = async (username) => {
    try {
      const { checkUsernameExists } = await import('../../firebase/firestore');
      if (checkUsernameExists) {
        const exists = await checkUsernameExists(username);
        return exists;
      }
      return false;
    } catch (error) {
      console.error("Error checking username:", error);
      setFormErrors(prev => ({
        ...prev,
        username: 'Could not verify username availability. Please try again.'
      }));
      // Return false to prevent blocking progress on technical errors
      return false;
    }
  };

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced email validation
  const debouncedValidateEmail = useCallback(
    debounce(async (email) => {
      if (email && email.includes('@') && email.includes('.')) {
        setIsEmailChecking(true);
        const error = await validateEmail(email);
        setFormErrors(prev => ({ ...prev, email: error }));
        setIsEmailChecking(false);
      }
    }, 800),
    []
  );

  // Step validation
  const validateStep = async (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email is invalid';
      } else {
        // Check if email is already registered - making this a blocking validation
        try {
          const auth = getAuth();
          console.log("Validating email in validateStep:", formData.email);
          const methods = await fetchSignInMethodsForEmail(auth, formData.email);
          console.log("Email methods found in validateStep:", methods);

          if (methods && methods.length > 0) {
            console.log("Email already exists in validateStep!");
            errors.email = 'This email is already registered. Please use a different email or login instead.';
            errors.emailHighlight = true; // Add highlight flag for better visibility
            return errors; // Return immediately to block progression
          }

          // Also check in Firestore
          try {
            const { checkEmailExists } = await import('../../firebase/firestore');
            if (checkEmailExists) {
              const exists = await checkEmailExists(formData.email);
              console.log("Firestore check result in validateStep:", exists);

              if (exists) {
                console.log("Email exists in Firestore!");
                errors.email = 'This email is already registered. Please use a different email or login instead.';
                errors.emailHighlight = true; // Add highlight flag for better visibility
                return errors; // Return immediately to block progression
              }
            }
          } catch (firestoreError) {
            console.error("Firestore email check error in validateStep:", firestoreError);
            // Treat permission denied as potential existence
            if (firestoreError.message && firestoreError.message.includes('permission-denied')) {
              errors.email = 'Unable to verify email uniqueness. Please try again.';
              errors.emailHighlight = true;
              return errors;
            }
          }
        } catch (error) {
          console.error("Error checking email in validateStep:", error);
          if (error.code === 'auth/email-already-in-use') {
            errors.email = 'This email is already registered. Please use a different email or login instead.';
            errors.emailHighlight = true; // Add highlight flag for better visibility
            return errors;
          } else {
            errors.email = 'Error verifying email. Please try again.';
            errors.emailHighlight = true;
            return errors;
          }
        }
      }
    } else if (step === 2) {
      if (!formData.usagePurpose.trim()) errors.usagePurpose = 'Usage purpose is required';
      if (!formData.referralSource.trim()) errors.referralSource = 'Referral source is required';
    } else if (step === 3) {
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    } else if (step === 4) {
      if (!formData.username.trim()) errors.username = 'Username is required';
      if (formData.bio && formData.bio.length > 160) errors.bio = 'Bio must be 160 characters or less';
      if (!termsAccepted) errors.terms = 'You must accept the Terms of Service and Privacy Policy to continue';
    }
    return errors;
  };

  // Step navigation
  const handleNextStep = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    // For step 1, always check email regardless of other validations
    if (currentStep === 1) {
      setIsSubmitting(true);

      // Validate basic fields first
      const basicErrors = {};
      if (!formData.firstName.trim()) basicErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) basicErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        basicErrors.email = 'Email is required';
        setFormErrors({...basicErrors});
        setIsSubmitting(false);
        return;
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        basicErrors.email = 'Email is invalid';
        setFormErrors({...basicErrors});
        setIsSubmitting(false);
        return;
      }

      // If basic validation passes, check if email is already registered
      if (Object.keys(basicErrors).length === 0) {
        try {
          console.log("Checking email:", formData.email);
          const auth = getAuth();

          // Make sure auth is initialized
          if (!auth) {
            console.error("Firebase auth is not initialized");
            setFormErrors({
              auth: "Authentication service is unavailable. Please try again."
            });
            setIsSubmitting(false);
            return;
          }

          // Step 1: Check with Firebase Authentication
          const methods = await fetchSignInMethodsForEmail(auth, formData.email);
          console.log("Email methods found:", methods);

          if (methods && methods.length > 0) {
            console.log("Email already exists in Auth! Blocking next step!");
            setFormErrors({
              email: 'This email is already registered. Please use a different email or login instead.',
              emailHighlight: true
            });
            setIsSubmitting(false);
            return; // Critical: This prevents moving to the next step
          }

          // Step 2: Double check with Firestore
          try {
            const { checkEmailExists } = await import('../../firebase/firestore');
            if (checkEmailExists) {
              const exists = await checkEmailExists(formData.email);
              console.log("Firestore email check result:", exists);

              if (exists) {
                console.log("Email exists in Firestore! Blocking next step!");
                setFormErrors({
                  email: 'This email is already registered. Please use a different email or login instead.',
                  emailHighlight: true
                });
                setIsSubmitting(false);
                return; // Stop here if email exists in Firestore
              }
            }
          } catch (firestoreError) {
            console.error("Firestore email check error:", firestoreError);
            // Only return if we get a permission denied error (could indicate the email exists)
            if (firestoreError.message && firestoreError.message.includes('permission-denied')) {
              setFormErrors({
                email: 'Unable to verify email uniqueness. Please try again.',
                emailHighlight: true
              });
              setIsSubmitting(false);
              return;
            }
          }

          // Check other fields for this step
          if (Object.keys(basicErrors).length > 0) {
            setFormErrors(basicErrors);
            setIsSubmitting(false);
            return;
          }

          // If we reach here, check the remaining validations with validateStep
          const errors = await validateStep(1);
          if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setIsSubmitting(false);
            return;
          }

          // If we reach here, everything is good for step 1
          setCurrentStep(2);
          setIsSubmitting(false);
          return; // Exit the function here

        } catch (error) {
          console.error("Full error object:", error);

          // Handle any possible Firebase errors
          if (error.code === 'auth/email-already-in-use' ||
              error.code === 'auth/invalid-email') {
            setFormErrors({
              email: 'This email is already registered or invalid. Please use a different email.',
              emailHighlight: true
            });
          } else {
            setFormErrors({
              email: 'There was a problem verifying this email. Please try again.',
              emailHighlight: true
            });
          }
          setIsSubmitting(false);
          return;
        }
      }
    }

    // Only continue if we pass all the validations
    const errors = await validateStep(currentStep);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setCurrentStep((prev) => prev + 1);
    setIsSubmitting(false);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev - 1);
  };

  // Final submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await validateStep(4);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    try {
      // Double-check email before final submission
      const auth = getAuth();
      try {
        // Normalize email for consistent comparison
        const normalizedEmail = formData.email.trim().toLowerCase();
        const methods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
        if (methods && methods.length > 0) {
          setFormErrors({ email: 'This email is already registered. Please go back to step 1 and use a different email.' });
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setFormErrors({ email: 'This email is already registered. Please go back to step 1 and use a different email.' });
          setIsSubmitting(false);
          return;
        }
      }

      // This is where the actual account creation happens - only in step 4
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, {
        displayName: formData.username,
      });
      await saveUserProfile(userCredential.user.uid, {
        ...formData,
        uid: userCredential.user.uid,
        registrationComplete: true,
        registrationStep: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date(),
      });
      setCurrentStep(5);
      setTimeout(() => navigate('/app'), 2000);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setFormErrors({
          auth: 'This email is already registered. Please go back to step 1 and use a different email.'
        });
      } else {
        setFormErrors({ auth: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle exit warning
  const handleBackClick = (e) => {
    e.preventDefault();
    if (formModified) {
      setShowExitWarning(true);
    } else {
      navigate('/');
    }
  };

  const handleConfirmExit = () => {
    setShowExitWarning(false);
    navigate('/');
  };

  const handleCancelExit = () => {
    setShowExitWarning(false);
  };

  // Stepper UI
  const renderStepper = () => (
    <div className="register-steps">
      {steps.map((label, idx) => (
        <React.Fragment key={label}>
          <div className={`step-container ${currentStep === idx + 1 ? 'active' : ''} ${currentStep > idx + 1 ? 'completed' : ''}`}>
            <div className="step-indicator">
              {currentStep > idx + 1 ? (
                <span className="step-check">✓</span>
              ) : (
                idx + 1
              )}
            </div>
            <span className="step-label">{label}</span>
          </div>
          {idx < steps.length - 1 && (
            <div className="step-divider">
              <div className={`step-divider-inner ${currentStep > idx + 1 ? 'completed' : ''}`}></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step content
  const renderStepContent = () => {
    const formClasses = `form-step ${animateIn ? 'animate-in' : ''}`;

    switch (currentStep) {
      case 1:
        return (
          <div className={formClasses}>
            <div className="step-header">
              <h2 className="step-title">Create Account</h2>
              <p className="step-description">Enter your details to get started</p>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">
                <span className="input-icon">👤</span>
                First Name
              </label>
              <div className="input-container animated">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  placeholder="Enter your first name"
                  className={`enhanced-input ${formData.firstName ? 'has-value' : ''} ${formErrors.firstName ? 'error' : ''}`}
                />
                {formData.firstName && <span className="input-check">✓</span>}
              </div>
              {formErrors.firstName && <div className="auth-error">{formErrors.firstName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                <span className="input-icon">👤</span>
                Last Name
              </label>
              <div className="input-container animated">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  placeholder="Enter your last name"
                  className={`enhanced-input ${formData.lastName ? 'has-value' : ''} ${formErrors.lastName ? 'error' : ''}`}
                />
                {formData.lastName && <span className="input-check">✓</span>}
              </div>
              {formErrors.lastName && <div className="auth-error">{formErrors.lastName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <span className="input-icon">✉️</span>
                Email Address
              </label>
              <div className={`input-container animated ${isEmailChecking ? 'loading' : ''}`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`enhanced-input ${formData.email ? 'has-value' : ''} ${formErrors.email ? 'error' : ''} ${formErrors.emailHighlight ? 'error-highlight' : ''}`}
                />
                {isEmailChecking && <div className="input-loading-indicator"></div>}
                {formData.email && !isEmailChecking && !formErrors.email && <span className="input-check">✓</span>}
              </div>
              {formErrors.email && !formErrors.emailHighlight && <div className="auth-error">{formErrors.email}</div>}
              {formErrors.emailHighlight && (
                <div className="error-highlight-text">
                  <i className="error-icon">!</i>
                  {formErrors.email}
                </div>
              )}
            </div>

            <div className="login-link-container">
              <p>Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={formClasses}>
            <div className="welcome-hero">
              <div className="hero-icon">📋</div>
              <h2 className="hero-title">Tell Us About You</h2>
              <p className="hero-subtitle">Help us personalize your Tasklio experience</p>
            </div>

            <div className="form-cards-container">
              <div className="form-card">
                <div className="card-header">
                  <div className="card-icon">🎯</div>
                  <div className="card-title">How will you use Tasklio?</div>
                </div>

                <div className="card-content">
                  <div className="input-group-modern">
                    <select
                      id="usagePurpose"
                      name="usagePurpose"
                      className={`modern-input ${formData.usagePurpose ? 'filled' : ''} ${formErrors.usagePurpose ? 'error' : ''}`}
                      value={formData.usagePurpose}
                      onChange={handleChange}
                    >
                      <option value="">Select your primary use case</option>
                      <option value="Personal Task Management">Personal Task Management</option>
                      <option value="Work Projects">Work Projects</option>
                      <option value="School/Education">School/Education</option>
                      <option value="Team Collaboration">Team Collaboration</option>
                      <option value="Other">Other</option>
                    </select>
                    {formData.usagePurpose && <div className="success-indicator">✓</div>}
                    {formErrors.usagePurpose && <div className="error-message">{formErrors.usagePurpose}</div>}
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="card-header">
                  <div className="card-icon">📢</div>
                  <div className="card-title">How did you hear about us?</div>
                </div>

                <div className="card-content">
                  <div className="input-group-modern">
                    <select
                      id="referralSource"
                      name="referralSource"
                      className={`modern-input ${formData.referralSource ? 'filled' : ''} ${formErrors.referralSource ? 'error' : ''}`}
                      value={formData.referralSource}
                      onChange={handleChange}
                    >
                      <option value="">Select how you found us</option>
                      <option value="Search Engine">Search Engine</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend or Colleague">Friend or Colleague</option>
                      <option value="Blog or Article">Blog or Article</option>
                      <option value="Other">Other</option>
                    </select>
                    {formData.referralSource && <div className="success-indicator">✓</div>}
                    {formErrors.referralSource && <div className="error-message">{formErrors.referralSource}</div>}
                  </div>
                </div>
              </div>

              <div className="form-card referral-card">
                <div className="card-header">
                  <div className="card-icon">🎁</div>
                  <div className="card-title">Referral Code (Optional)</div>
                </div>

                <div className="card-content">
                  <div className="input-group-modern">
                    <div className="floating-input">
                      <input
                        type="text"
                        id="referralCode"
                        name="referralCode"
                        className={`modern-input ${formData.referralCode ? 'filled' : ''}`}
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label htmlFor="referralCode" className="floating-label">Enter referral code</label>
                      {formData.referralCode && (
                        <div className="referral-applied-badge">Code Applied!</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={formClasses}>
            <div className="security-section">
              <div className="security-header">
                <div className="security-icon">🔒</div>
                <h2 className="security-title">Secure Your Account</h2>
                <p className="security-subtitle">Create a strong password to protect your data</p>
              </div>

              <div className="password-fields">
                <div className="password-field-wrapper">
                  <div className="password-field-header">
                    <div className="password-field-icon">🛡️</div>
                    <div className="password-field-title">Create Password</div>
                  </div>

                  <div className="password-input-container">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className="password-input"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>

                  {formErrors.password && (
                    <div className="password-match-indicator no-match">
                      <span>⚠️</span>
                      {formErrors.password}
                    </div>
                  )}

                  {formData.password && (
                    <div className="password-strength-indicator">
                      <div className="strength-meter">
                        <div
                          className="strength-fill"
                          style={{
                            width: `${Math.min(100, formData.password.length * 12.5)}%`,
                            background: formData.password.length < 6 ? '#ef4444' :
                                       formData.password.length < 10 ? '#f59e0b' : '#10b981'
                          }}
                        ></div>
                      </div>
                      <div className={`strength-text ${
                        formData.password.length < 6 ? 'weak' :
                        formData.password.length < 10 ? 'medium' : 'strong'
                      }`}>
                        <span>{formData.password.length < 6 ? '🔴' :
                               formData.password.length < 10 ? '🟡' : '🟢'}</span>
                        {formData.password.length < 6 ? 'Weak password' :
                         formData.password.length < 10 ? 'Medium password' : 'Strong password'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="password-field-wrapper">
                  <div className="password-field-header">
                    <div className="password-field-icon">🔐</div>
                    <div className="password-field-title">Confirm Password</div>
                  </div>

                  <div className="password-input-container">
                    <input
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="password-input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                      {confirmPasswordVisible ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>

                  {formData.confirmPassword && (
                    <div className={`password-match-indicator ${
                      formData.password === formData.confirmPassword ? 'match' : 'no-match'
                    }`}>
                      <span>{formData.password === formData.confirmPassword ? '✅' : '❌'}</span>
                      {formData.password === formData.confirmPassword ?
                        'Passwords match!' : 'Passwords do not match'}
                    </div>
                  )}

                  {formErrors.confirmPassword && (
                    <div className="password-match-indicator no-match">
                      <span>⚠️</span>
                      {formErrors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>

              <div className="security-tips">
                <div className="security-tips-header">
                  <div className="tips-icon">💡</div>
                  <div className="tips-title">Password Security Tips</div>
                </div>

                <div className="tips-grid">
                  <div className="tip-item">
                    <div className="tip-icon">✓</div>
                    <div className="tip-text">Use at least 8 characters</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">✓</div>
                    <div className="tip-text">Include uppercase letters</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">✓</div>
                    <div className="tip-text">Add numbers and symbols</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">✓</div>
                    <div className="tip-text">Avoid personal information</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={formClasses}>
            <div className="profile-completion-container">
              <div className="profile-hero-section">
                <span className="profile-hero-icon">✨</span>
                <h2 className="profile-hero-title">Complete Your Profile</h2>
                <p className="profile-hero-subtitle">Customize your Tasklio experience and make it uniquely yours</p>
              </div>

              <div className="profile-main-card">
                {/* Avatar Preview Section */}
                <div className="profile-preview-section">
                  <div
                    className="profile-avatar-large"
                    onClick={() => setShowAvatarModal(true)}
                    style={{
                      backgroundColor: formData.color,
                      ...(formData.avatarType === 'emoji' && {fontSize: '3rem'}),
                      ...(formData.avatarType === 'image' && {
                        backgroundImage: `url(${formData.avatarImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      })
                    }}
                  >
                    {formData.avatarType === 'initials' && `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`}
                    {formData.avatarType === 'emoji' && formData.avatarEmoji}
                    <div className="avatar-edit-overlay">
                      <span className="avatar-edit-text">Click to<br/>customize</span>
                    </div>
                  </div>

                  <div className="profile-display-info">
                    <h3 className="profile-display-name">{formData.firstName} {formData.lastName}</h3>
                    <div className="profile-display-username">@{formData.username || 'username'}</div>
                  </div>
                </div>

                {/* Username Section */}
                <div className="profile-form-section">
                  <div className="profile-section-title">
                    <div className="profile-section-icon">🏷️</div>
                    Choose Your Username
                  </div>

                  <div className="enhanced-input-group">
                    <div className="username-input-container">
                      <span className="username-prefix">@</span>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className={`enhanced-input-field username-input ${formData.username ? 'has-value' : ''} ${formErrors.username ? 'error' : ''}`}
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                      />
                      {formData.username && !formErrors.username && (
                        <span className="input-success-icon">✓</span>
                      )}
                    </div>
                    {formErrors.username && <div className="error-message">{formErrors.username}</div>}
                  </div>
                </div>

                {/* Bio Section */}
                <div className="profile-form-section">
                  <div className="profile-section-title">
                    <div className="profile-section-icon">📝</div>
                    About You (Optional)
                  </div>

                  <div className="enhanced-input-group">
                    <textarea
                      id="bio"
                      name="bio"
                      className={`enhanced-input-field bio-textarea ${formData.bio ? 'has-value' : ''} ${formErrors.bio ? 'error' : ''}`}
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us a bit about yourself..."
                      maxLength={160}
                      rows="4"
                    />
                    <div className={`character-counter ${formData.bio && formData.bio.length > 140 ? formData.bio.length > 155 ? 'danger' : 'warning' : ''}`}>
                      {formData.bio ? formData.bio.length : 0}/160 characters
                    </div>
                    {formErrors.bio && <div className="error-message">{formErrors.bio}</div>}
                  </div>
                </div>

                {/* Terms & Privacy Section */}
                <div className="terms-acceptance-section">
                  <div className="profile-section-title">
                    <div className="profile-section-icon">📋</div>
                    Terms & Privacy Agreement
                  </div>

                  <div
                    className="terms-checkbox-wrapper"
                    onClick={() => setTermsAccepted(!termsAccepted)}
                  >
                    <div className={`custom-checkbox ${termsAccepted ? 'checked' : ''}`}>
                      <span className="checkbox-checkmark">✓</span>
                    </div>
                    <div className="terms-text">
                      I agree to Tasklio's{' '}
                      <span
                        className="terms-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTermsModal(true);
                        }}
                      >
                        Terms of Service
                      </span>
                      {' '}and{' '}
                      <span
                        className="terms-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPrivacyModal(true);
                        }}
                      >
                        Privacy Policy
                      </span>
                      . I understand that my data will be processed according to these terms.
                    </div>
                  </div>
                  {formErrors.terms && <div className="error-message">{formErrors.terms}</div>}
                </div>

                {/* Completion Button */}
                <div className="completion-button-section">
                  <button
                    type="submit"
                    className="complete-registration-btn"
                    disabled={isSubmitting || !termsAccepted}
                  >
                    <div className="btn-content">
                      {isSubmitting ? (
                        <>
                          <div className="btn-loading-spinner"></div>
                          Creating Your Account...
                        </>
                      ) : (
                        <>
                          Complete Registration
                          <span className="btn-rocket">🚀</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={`${formClasses} success-container`}>
            <div className="success-animation">
              <div className="checkmark-circle">
                <div className="checkmark draw"></div>
              </div>
            </div>
            <h2 className="success-title">You're all set!</h2>
            <p className="success-message">Your account has been created successfully. Welcome to Tasklio!</p>
            <div className="success-details">
              <div className="user-profile-preview">
                <div
                  className="profile-avatar"
                  style={{
                    backgroundColor: formData.color,
                    ...(formData.avatarType === 'emoji' && {fontSize: '1.5rem'}),
                    ...(formData.avatarType === 'image' && {
                      backgroundImage: `url(${formData.avatarImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    })
                  }}
                >
                  {formData.avatarType === 'initials' && `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`}
                  {formData.avatarType === 'emoji' && formData.avatarEmoji}
                </div>
                <div className="profile-info">
                  <h3>{formData.firstName} {formData.lastName}</h3>
                  <p>@{formData.username}</p>
                </div>
              </div>
              <p className="redirect-message">Redirecting you to your dashboard...</p>
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <div className="auth-header">
          <Link to="/" className="back-to-home" onClick={handleBackClick}>
            <span className="back-icon">←</span>
            <span className="back-text">Back to Home</span>
          </Link>
          <div className="brand-logo">
            <div className="logo-icon">T</div>
            <span className="logo-text">Tasklio</span>
          </div>
        </div>

        {/* Add the step indicator here */}
        {renderStepper()}

        <form ref={formRef} onSubmit={currentStep === 4 ? handleSubmit : handleNextStep}>
          {renderStepContent()}
          {currentStep < 4 && (
            <div className="auth-buttons">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="auth-button back-button"
                >
                  <span className="button-icon">←</span>
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="auth-button next-button"
                disabled={isSubmitting}
              >
                <div className="btn-content">
                  {isSubmitting ? (
                    <div className="btn-loading-spinner"></div>
                  ) : (
                    <>
                      <span>{currentStep === 4 ? 'Complete Registration' : 'Continue'}</span>
                      <span className="button-icon">→</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          )}
        </form>

        {/* ...existing code for modals and other components... */}
      </div>
    </div>
  );
};

export default RegisterFirebase;
