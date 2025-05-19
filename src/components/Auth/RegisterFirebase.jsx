import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from 'firebase/auth';
import { saveUserProfile } from '../../firebase/firestore';
import RegistrationMockups from './components/RegistrationMockups';
import './styles/RegisterFirebase.css';
import './styles/RegisterFirebase-email-error.css';
import './styles/RegisterFirebase-avatar.css';
import './styles/RegisterFirebase-terms.css';
import './styles/RegisterFirebase-initials.css';
import './styles/RegisterFirebase-modal.css'; /* Add this new stylesheet import */
import TermsOfServiceModal from '../common/TermsOfServiceModal';
import PrivacyPolicyModal from '../common/PrivacyPolicyModal';

const steps = [
  'Account Info',
  'Additional Info',
  'Security',
  'Profile',
  'Finish',
];

const RegisterFirebase = () => {
  const navigate = useNavigate();  
  const [currentStep, setCurrentStep] = useState(1);
  const [activeEmojiCategory, setActiveEmojiCategory] = useState('smileys');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    color: '#5b5ef4',
    bio: '',
    profileVisibility: 'public',
    referralCode: '',
    referralSource: '',
    usagePurpose: '',
    avatarType: 'initials', // 'initials', 'emoji', 'image', or 'color'
    avatarEmoji: '😎',
    avatarImage: '',
    avatarTabView: 'initials', // For tracking active tab in avatar modal
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [isEmailChecking, setIsEmailChecking] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Mark form as modified once user starts entering data
    if (!formModified) {
      setFormModified(true);
    }
    
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
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
            <h2 className="step-title">Create Your Account</h2>
            <p className="step-description">Enter your information to get started with Tasklio</p>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-container">
                  <span className="input-icon">👤</span>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    className={`auth-input ${formErrors.firstName ? 'error' : ''}`} 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    placeholder="Enter your first name" 
                  />
                </div>
                {formErrors.firstName && <div className="auth-error">{formErrors.firstName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-container">
                  <span className="input-icon">👤</span>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    className={`auth-input ${formErrors.lastName ? 'error' : ''}`} 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    placeholder="Enter your last name" 
                  />
                </div>
                {formErrors.lastName && <div className="auth-error">{formErrors.lastName}</div>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className={`input-container ${isEmailChecking ? 'loading' : ''}`}>
                <span className="input-icon">✉️</span>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className={`auth-input ${formErrors.email ? 'error' : ''} ${formErrors.emailHighlight ? 'error-highlight' : ''}`} 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Enter your email address" 
                />
                {isEmailChecking && <div className="input-loading-indicator"></div>}
              </div>
              {formErrors.email && <div className="auth-error">{formErrors.email}</div>}
            </div>
            
            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login" className="auth-link">Log in</Link>
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={formClasses}>
            <h2 className="step-title">Additional Information</h2>
            <p className="step-description">Tell us more about how you'll use Tasklio</p>
            
            <div className="form-group">
              <label htmlFor="usagePurpose">
                <span className="input-icon">🎯</span>
                What will you use Tasklio for?
              </label>
              <select 
                id="usagePurpose" 
                name="usagePurpose" 
                className={`auth-input styled-select ${formErrors.usagePurpose ? 'error' : ''}`} 
                value={formData.usagePurpose} 
                onChange={handleChange}
              >
                <option value="">Select a purpose</option>
                <option value="Personal Task Management">Personal Task Management</option>
                <option value="Work Projects">Work Projects</option>
                <option value="School/Education">School/Education</option>
                <option value="Team Collaboration">Team Collaboration</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.usagePurpose && <div className="auth-error">{formErrors.usagePurpose}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="referralSource">
                <span className="input-icon">📢</span>
                How did you hear about us?
              </label>
              <select 
                id="referralSource" 
                name="referralSource" 
                className={`auth-input styled-select ${formErrors.referralSource ? 'error' : ''}`} 
                value={formData.referralSource} 
                onChange={handleChange}
              >
                <option value="">Select a source</option>
                <option value="Search Engine">Search Engine</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend or Colleague">Friend or Colleague</option>
                <option value="Blog or Article">Blog or Article</option>
                <option value="Other">Other</option>
              </select>
              {formErrors.referralSource && <div className="auth-error">{formErrors.referralSource}</div>}
            </div>
            
            <div className="form-group referral-code-container">
              <label htmlFor="referralCode" className="referral-label">
                <span className="input-icon gift-icon">🎁</span>
                Referral Code (optional)
              </label>
              <div className="input-container referral-input-container">
                <input 
                  type="text" 
                  id="referralCode" 
                  name="referralCode" 
                  className="auth-input referral-input" 
                  value={formData.referralCode} 
                  onChange={handleChange} 
                  placeholder="Enter referral code if you have one" 
                />
                {formData.referralCode && 
                  <div className="referral-badge">Code Applied</div>
                }
              </div>
            </div>
            
            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login" className="auth-link">Log in</Link>
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={formClasses}>
            <h2 className="step-title">Secure your account</h2>
            <p className="step-description">Create a strong password to protect your account</p>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className={`auth-input ${formErrors.password ? 'error' : ''}`} 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Create a strong password" 
                />
              </div>
              {formErrors.password && <div className="auth-error">{formErrors.password}</div>}
              
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-meter">
                    <div 
                      className={`strength-fill ${formData.password.length < 6 ? 'weak' : formData.password.length < 10 ? 'medium' : 'strong'}`} 
                      style={{width: `${Math.min(100, formData.password.length * 10)}%`}}
                    ></div>
                  </div>
                  <span className="strength-text">
                    {formData.password.length < 6 ? 'Weak password' : 
                     formData.password.length < 10 ? 'Medium password' : 'Strong password'}
                  </span>
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  className={`auth-input ${formErrors.confirmPassword ? 'error' : ''}`} 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Confirm your password"
                />
              </div>
              {formErrors.confirmPassword && <div className="auth-error">{formErrors.confirmPassword}</div>}
            </div>
            
            <div className="security-tips">
              <h4>Password Tips:</h4>
              <ul>
                <li>Use at least 8 characters</li>
                <li>Include uppercase and lowercase letters</li>
                <li>Add numbers and special characters</li>
                <li>Don't use easily guessable information</li>
              </ul>
            </div>
            
            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login" className="auth-link">Log in</Link>
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={formClasses}>
            <h2 className="step-title">Set up your profile</h2>
            <p className="step-description">Customize your experience with Tasklio</p>
            <div className="profile-customization-container">
              <div className="profile-header">
                <div className="profile-preview">
                  <div 
                    className="profile-avatar-large clickable"
                    onClick={() => setShowAvatarModal(true)}
                    style={{
                      backgroundColor: formData.color,
                      ...(formData.avatarType === 'emoji' && {fontSize: '2rem'}),
                      ...(formData.avatarType === 'image' && {
                        backgroundImage: `url(${formData.avatarImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      })
                    }}
                  >
                    {formData.avatarType === 'initials' && `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`}
                    {formData.avatarType === 'emoji' && formData.avatarEmoji}
                    <div className="avatar-hover-overlay">
                      <span>Change Avatar</span>
                    </div>
                  </div>
                  <h3 className="profile-name">{formData.firstName} {formData.lastName}</h3>
                  <p className="profile-username">@{formData.username || 'username'}</p>
                </div>
              </div>
                <div className="form-section">
                <h4 className="section-title">Basic Information</h4>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <div className="input-container">
                    <span className="input-icon">@</span>
                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      className={`auth-input ${formErrors.username ? 'error' : ''}`} 
                      value={formData.username} 
                      onChange={handleChange} 
                      placeholder="Choose a unique username" 
                    />
                  </div>
                  {formErrors.username && <div className="auth-error">{formErrors.username}</div>}
                </div>
                  <div className="form-group">
                  <label htmlFor="bio">Bio (optional, max 160 chars)</label>
                  <textarea 
                    id="bio" 
                    name="bio" 
                    className={`auth-input textarea ${formErrors.bio ? 'error' : ''}`} 
                    value={formData.bio} 
                    onChange={handleChange} 
                    maxLength={160} 
                    placeholder="Tell us about yourself"
                  />
                  {formData.bio && (
                    <div className="char-counter">
                      <span>{formData.bio.length}/160</span>
                    </div>
                  )}
                  {formErrors.bio && <div className="auth-error">{formErrors.bio}</div>}
                </div>
                <div className="form-group terms-checkbox-container">
                  <div className={`terms-checkbox ${formErrors.terms ? 'error' : ''}`}>
                    <input 
                      type="checkbox" 
                      id="termsAccepted" 
                      checked={termsAccepted} 
                      onChange={(e) => setTermsAccepted(e.target.checked)} 
                    />
                    <label htmlFor="termsAccepted">
                      I agree to the <span className="terms-link" onClick={() => setShowTermsModal(true)}>Terms of Service</span> and <span className="terms-link" onClick={() => setShowPrivacyModal(true)}>Privacy Policy</span>
                    </label>
                  </div>                  
                  {formErrors.terms && <div className="auth-error">{formErrors.terms}</div>}
                </div>
                
                <div className="auth-buttons profile-buttons">
                  <button
                    type="button"
                    className="auth-button back-button"
                    onClick={handlePrevStep}
                  >
                    <span className="button-icon">←</span>
                    Back
                  </button>
                  <button
                    type="submit"
                    className="auth-button complete-registration-button"
                  >
                    Complete Registration
                  </button>
                </div>
              </div>
              
              <div className="auth-footer auth-footer-profile">
                <p>
                  Already have an account? <Link to="/login" className="auth-link">Log in</Link>
                </p>
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
            <span>Back to Home</span>
          </Link>
          <div className="brand-logo">
            <div className="logo-icon">T</div>
            <div className="logo-text">Tasklio</div>
          </div>
        </div>
        
        {renderStepper()}
        
        <div className="auth-content">
          {formErrors.auth && (
            <div className="auth-error-banner">
              <span className="error-icon">!</span>
              <span>{formErrors.auth}</span>
            </div>
          )}
          
          <form onSubmit={currentStep === 4 ? handleSubmit : handleNextStep}>
            {renderStepContent()}
            
            {currentStep < 4 && (
              <div className="auth-buttons">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="auth-button back-button"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                  >
                    <span className="button-icon">←</span>
                    Back
                  </button>
                )}
                
                <button
                  type="submit"
                  className={`auth-button next-button ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? currentStep === 1 
                      ? 'Verifying Email...' 
                      : 'Processing...'
                    : 'Continue'}
                  {!isSubmitting && <span className="button-icon">→</span>}
                </button>
              </div>
            )}          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login" className="auth-link">Log In</Link>
            </p>
          </div>
          </form>
        </div>
      </div>
      
      <div className="register-mockup-container">
        <RegistrationMockups />
      </div>
      
      {showExitWarning && (
        <div className="exit-warning-overlay">
          <div className="exit-warning-modal">
            <div className="exit-warning-content">
              <h3>Are you sure you want to leave?</h3>
              <p>Your progress will be lost if you leave this page.</p>
              <div className="exit-warning-buttons">
                <button className="cancel-button" onClick={handleCancelExit}>Stay</button>
                <button className="exit-button" onClick={handleConfirmExit}>Leave</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showTermsModal && (
        <TermsOfServiceModal 
          isOpen={showTermsModal} 
          onClose={() => setShowTermsModal(false)} 
        />
      )}
      
      {showPrivacyModal && (
        <PrivacyPolicyModal 
          isOpen={showPrivacyModal} 
          onClose={() => setShowPrivacyModal(false)} 
        />
      )}
      
      {showAvatarModal && (
        <div className="avatar-modal-overlay">
          <div className="avatar-modal">
            <div className="avatar-modal-header">
              <h3>Choose Your Avatar</h3>
              <button className="close-button" onClick={() => setShowAvatarModal(false)}>×</button>
            </div>
            
            <div className="avatar-modal-content">
              <div className="avatar-type-tabs">
                <div 
                  className={`avatar-tab ${formData.avatarTabView === 'initials' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({...prev, avatarTabView: 'initials', avatarType: 'initials'}))}
                >
                  Initials
                </div>
                <div 
                  className={`avatar-tab ${formData.avatarTabView === 'emoji' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({...prev, avatarTabView: 'emoji', avatarType: 'emoji'}))}
                >
                  Emoji
                </div>
                <div 
                  className={`avatar-tab ${formData.avatarTabView === 'upload' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({...prev, avatarTabView: 'upload', avatarType: 'image'}))}
                >
                  Upload
                </div>
                <div 
                  className={`avatar-tab ${formData.avatarTabView === 'color' ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({...prev, avatarTabView: 'color', avatarType: 'color'}))}
                >
                  Color
                </div>
              </div>
              
              <div className="avatar-content">
                {formData.avatarTabView === 'initials' && (
                  <div className="initials-preview">
                    <div 
                      className="large-avatar-preview"
                      style={{backgroundColor: formData.color}}
                    >
                      {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                    </div>
                    <p className="avatar-info-text">
                      Your initials will be shown on a colored background
                    </p>
                    
                    <div className="initials-input-container">
                      <div className="initials-input-group">
                        <label htmlFor="initialsFirstName">First Name Initial</label>
                        <input
                          type="text"
                          id="initialsFirstName"
                          name="initialsFirstName"
                          value={formData.firstName.charAt(0) || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 1) {
                              setFormData(prev => ({...prev, firstName: value + prev.firstName.slice(1)}));
                            }
                          }}
                          maxLength="1"
                          className="initials-input"
                        />
                      </div>
                      <div className="initials-input-group">
                        <label htmlFor="initialsLastName">Last Name Initial</label>
                        <input
                          type="text"
                          id="initialsLastName"
                          name="initialsLastName"
                          value={formData.lastName.charAt(0) || ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 1) {
                              setFormData(prev => ({...prev, lastName: value + prev.lastName.slice(1)}));
                            }
                          }}
                          maxLength="1"
                          className="initials-input"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {formData.avatarTabView === 'emoji' && (
                  <div className="emoji-selector">
                    <div 
                      className="large-avatar-preview"
                      style={{backgroundColor: formData.color}}
                    >
                      {formData.avatarEmoji}
                    </div>
                    <p className="avatar-info-text">Select an emoji to represent you</p>
                    <div className="emoji-search">
                      <input 
                        type="text" 
                        className="emoji-search-input" 
                        id="emojiSearch"
                        name="emojiSearch"
                        placeholder="Search emojis..." 
                      />
                    </div>
                    <div className="emoji-categories">
                      <div 
                        className={`emoji-category ${activeEmojiCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveEmojiCategory('all')}
                      >
                        🔍 All
                      </div>
                      <div 
                        className={`emoji-category ${activeEmojiCategory === 'smileys' ? 'active' : ''}`}
                        onClick={() => setActiveEmojiCategory('smileys')}
                      >
                        😊 Smileys
                      </div>
                      <div 
                        className={`emoji-category ${activeEmojiCategory === 'animals' ? 'active' : ''}`}
                        onClick={() => setActiveEmojiCategory('animals')}
                      >
                        🐱 Animals
                      </div>
                      <div 
                        className={`emoji-category ${activeEmojiCategory === 'food' ? 'active' : ''}`}
                        onClick={() => setActiveEmojiCategory('food')}
                      >
                        🍕 Food
                      </div>
                      <div 
                        className={`emoji-category ${activeEmojiCategory === 'activities' ? 'active' : ''}`}
                        onClick={() => setActiveEmojiCategory('activities')}
                      >
                        🏀 Activities
                      </div>
                      <div 
                        className={`emoji-category ${activeEmojiCategory === 'objects' ? 'active' : ''}`}
                        onClick={() => setActiveEmojiCategory('objects')}
                      >
                        💼 Objects
                      </div>
                      <div 
                        className={`emoji-category ${activeEmojiCategory === 'places' ? 'active' : ''}`}
                        onClick={() => setActiveEmojiCategory('places')}
                      >
                        🏙️ Places
                      </div>
                      <div 
                        className={`emoji-category ${activeEmojiCategory === 'symbols' ? 'active' : ''}`}
                        onClick={() => setActiveEmojiCategory('symbols')}
                      >
                        🔣 Symbols
                      </div>
                    </div>
                    <div className="emoji-grid">
                      {(() => {
                        // Define emoji categories
                        const emojiCategories = {
                          all: [
                            // All emojis from all categories
                            '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💣', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭', '💤'
                          ],
                          smileys: [
                            '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯', '💢', '💥', '💫', '💦', '💨', '🕳️', '💣', '💬', '👁️‍🗨️', '🗨️', '🗯️', '💭', '💤'
                          ],
                          animals: [
                            '🐵', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮', '🐕‍🦺', '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', '🐈‍⬛', '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', '🐿️', '🦔', '🦇', '🐻', '🐻‍❄️', '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🐦', '🐧', '🕊️', '🦅', '🦆', '🦢', '🦉', '🦩', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🐟', '🐠', '🐡', '🦈', '🐙', '🐚', '🐌', '🦋', '🐛', '🐜', '🐝', '🐞', '🦗', '🕷️', '🕸️', '🦂', '🦟', '🦠'
                          ],
                          food: [
                            '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊', '🥄', '🍴', '🍽️', '🥢', '🧂'
                          ],
                          activities: [
                            '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🏋️‍♂️', '🏋️‍♀️', '🤼', '🤼‍♂️', '🤼‍♀️', '🤸', '🤸‍♂️', '🤸‍♀️', '⛹️', '⛹️‍♂️', '⛹️‍♀️', '🤺', '🤾', '🤾‍♂️', '🤾‍♀️', '🏌️', '🏌️‍♂️', '🏌️‍♀️', '🏇', '🧘', '🧘‍♂️', '🧘‍♀️', '🏄', '🏄‍♂️', '🏄‍♀️', '🏊', '🏊‍♂️', '🏊‍♀️', '🤽', '🤽‍♂️', '🤽‍♀️', '🚣', '🚣‍♂️', '🚣‍♀️', '🧗', '🧗‍♂️', '🧗‍♀️', '🚵', '🚵‍♂️', '🚵‍♀️', '🚴', '🚴‍♂️', '🚴‍♀️', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '🎲', '♟️', '🎯', '🎳', '🎮', '🎰', '🧩'
                          ],
                          objects: [
                            '🚀', '🛸', '🚁', '🛰️', '✈️', '🚂', '🚘', '🏎️', '🏍️', '⚓', '⏰', '📱', '💻', '🖥️', '💾', '📷', '🔍', '💡', '🛒', '🔑', '💼', '📚', '📖', '💰', '💎', '🧸', '🎁', '📦', '📫', '🧹', '🧻', '🧽', '🧴', '👓', '👕', '👗', '👑', '💄', '👜', '🧳', '☂️', '💍', '⚽', '🏀', '🏈', '⚾', '🏐', '🎮', '📲', '📟', '🔋', '🔌', '📞', '☎️', '📠', '⌨️', '🖱️', '💿', '💽', '💻', '🖨️', '🖲️', '📸', '📹', '🎥', '🎞️', '📽️', '📺', '📻', '📢', '📯', '🔊', '🔔', '🔍', '🔭', '🔬', '💉', '💊', '🧬', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩', '⚙️'
                          ],
                          places: [
                            '🏙️', '🌆', '🌇', '🌃', '🌉', '🌁', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛️', '⛪', '🕌', '🕍', '🛕', '🕋', '⛩️', '🛤️', '🛣️', '🗾', '🎑', '🏞️', '🌅', '🌄', '🌠', '🎇', '🎆', '🌇', '🏙️'
                          ],
                          symbols: [
                            '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿', '🅿️', '🛗', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '⚧', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸️', '⏯️', '⏹️', '⏺️', '⏭️', '⏮️', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '♾️', '💲', '💱', '™️', '©️', '®️', '👁️‍🗨️', '🔚', '🔙', '🔛', '🔝', '🔜'
                          ]
                        };

                        // Get the appropriate emoji category
                        let displayEmojis;
                        switch (activeEmojiCategory) {
                          case 'all':
                            displayEmojis = emojiCategories.all; // Show all emojis without limitation
                            break;
                          case 'smileys':
                            displayEmojis = emojiCategories.smileys;
                            break;
                          case 'animals':
                            displayEmojis = emojiCategories.animals;
                            break;
                          case 'food':
                            displayEmojis = emojiCategories.food;
                            break;
                          case 'activities':
                            displayEmojis = emojiCategories.activities;
                            break;
                          case 'objects':
                            displayEmojis = emojiCategories.objects;
                            break;
                          case 'places':
                            displayEmojis = emojiCategories.places;
                            break;
                          case 'symbols':
                            displayEmojis = emojiCategories.symbols;
                            break;
                          default:
                            displayEmojis = emojiCategories.smileys;
                        }

                        // Return the emoji grid items
                        return displayEmojis.map(emoji => (
                          <div 
                            key={emoji} 
                            className={`emoji-item ${formData.avatarEmoji === emoji ? 'selected' : ''}`}
                            onClick={() => setFormData(prev => ({...prev, avatarEmoji: emoji}))}
                          >
                            {emoji}
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}
                
                {formData.avatarTabView === 'upload' && (
                  <div className="upload-image-selector">
                    <div 
                      className="large-avatar-preview image-preview"
                      style={{
                        backgroundImage: formData.avatarImage ? `url(${formData.avatarImage})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: !formData.avatarImage ? '#eee' : 'transparent'
                      }}
                    >
                      {!formData.avatarImage && <span className="no-image">Upload an image</span>}
                    </div>
                    <p className="avatar-info-text">Upload your own photo or image</p>
                    
                    <div className="upload-controls">
                      <input 
                        type="file" 
                        id="avatarImageUpload" 
                        name="avatarImageUpload"
                        accept="image/*" 
                        className="file-input" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setFormData(prev => ({
                                ...prev, 
                                avatarImage: event.target.result,
                                avatarType: 'image'
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }} 
                      />
                      <label htmlFor="avatarImageUpload" className="upload-button">
                        Choose Image
                      </label>
                    </div>
                    
                    <div className="upload-tips">
                      <h5>Tips for a good profile image:</h5>
                      <ul>
                        <li>Square images work best</li>
                        <li>Keep file size under MB</li>
                        <li>Use PNG or JPG format</li>
                        <li>Make sure your face is clearly visible if using a photo</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {formData.avatarTabView === 'color' && (
                  <div className="color-selector">
                    <div 
                      className="large-avatar-preview"
                      style={{backgroundColor: formData.color}}
                    >
                      {formData.avatarType === 'initials' && `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`}
                      {formData.avatarType === 'emoji' && formData.avatarEmoji}
                    </div>
                    <h5>Choose Your Profile Color</h5>
                    <p className="avatar-info-text">Pick a color for your avatar background</p>
                    <div className="color-palette">
                      {[
                        // Blues
                        '#5b5ef4', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#64b5f6', '#1976d2', '#0d47a1', '#039be5', '#4fc3f7',
                        // Greens
                        '#009688', '#4caf50', '#8bc34a', '#cddc39', '#7cb342', '#43a047', '#2e7d32', '#1b5e20', '#26a69a', '#66bb6a',
                        // Yellows & Oranges
                        '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#ff9064', '#fdd835', '#ffb300', '#ff8f00', '#f57c00', '#ffb74d', 
                        // Reds & Pinks
                        '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#f45b7a', '#ef5350', '#c62828', '#b71c1c', '#ec407a', '#ad1457',
                        // Purples & Violets
                        '#9c27b0', '#673ab7', '#7e57c2', '#5e35b1', '#4527a0', '#512da8', '#d500f9', '#aa00ff', '#651fff', '#6200ea',
                        // Neutrals & Grays
                        '#607d8b', '#795548', '#9e9e9e', '#424242', '#212121', '#757575', '#616161', '#455a64', '#37474f', '#263238',
                        // Other Colors
                        '#006064', '#880e4f', '#1a237e', '#33691e', '#ff6f00', '#3e2723', '#004d40', '#827717', '#e65100', '#212121'
                      ].map(color => (
                        <div 
                          key={color}
                          className={`color-dot ${formData.color === color ? 'selected' : ''}`}
                          style={{backgroundColor: color}}
                          onClick={() => setFormData(prev => ({...prev, color: color}))}
                        >
                          {formData.color === color && <div className="dot-check">✓</div>}
                        </div>
                      ))}
                    </div>
                    
                    <div className="custom-color-picker">
                      <div className="color-preview" style={{backgroundColor: formData.color}}></div>
                      <input 
                        type="color" 
                        id="avatarColor" 
                        name="avatarColor" 
                        className="color-input" 
                        value={formData.color} 
                        onChange={(e) => setFormData(prev => ({...prev, color: e.target.value}))} 
                      />
                      <div className="color-hex">{formData.color}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="avatar-modal-footer">
              <button 
                className="modal-cancel-button" 
                onClick={() => setShowAvatarModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-save-button" 
                onClick={() => setShowAvatarModal(false)}
              >
                Save Avatar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Registration confirmation modal */}
      {isSubmitting && currentStep === 4 && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <div className="spinner"></div>
              <h3>Creating Your Account</h3>
              <p>Please wait while we set up your Tasklio account...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterFirebase;
