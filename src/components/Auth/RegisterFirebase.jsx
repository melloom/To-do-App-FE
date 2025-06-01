import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth';
import { saveUserProfile } from '../../firebase/firestore';
import ProfilePictureModal from './components/ProfilePictureModal';
import RegistrationMockup from './components/RegistrationMockup';
import TermsModal from './modals/TermsModal';
import PrivacyModal from './modals/PrivacyModal';
import ConfirmationModal from '../common/ConfirmationModal';
import './styles/RegisterFirebase.css';
import './styles/RegisterFirebase-stepper.css';
import './styles/RegisterFirebase-forms.css';
import './styles/RegisterFirebase-buttons.css';
import './styles/RegisterFirebase-header.css';
import './styles/RegisterFirebase-modal.css';
import './styles/RegisterFirebase-profile.css';
import './styles/RegisterFirebase-terms.css';

const steps = [
  'Account Info',
  'Additional Info',
  'Security',
  'Profile',
  'Complete'
];

// Move validatePassword outside the component to make it stable
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must include at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) { // Fixed typo: was /[a-zF]/
    errors.push('Password must include at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must include at least one number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must include at least one symbol');
  }
  return errors;
};

// Move debounce function outside the component to make it stable
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Move email validation function completely outside component to make it stable
const validateEmailAsync = async (email) => {
  if (!email.trim()) return 'Email is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';

  // Normalize the email by trimming whitespace and converting to lowercase
  const normalizedEmail = email.trim().toLowerCase();

  try {
    // Primary check with Firebase Authentication - this is the most reliable
    const auth = getAuth();
    console.log("Validating email:", normalizedEmail);
    const methods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
    console.log("Authentication check result:", methods);

    if (methods && methods.length > 0) {
      console.log("Email exists in Authentication with methods:", methods);
      return 'This email is already registered. Please use a different email or try logging in instead.';
    }

    console.log("Email is available for registration");
    return ''; // Email is available
  } catch (error) {
    console.error("Email validation error:", error);
    if (error.code === 'auth/email-already-in-use') {
      return 'This email is already registered. Please use a different email or try logging in instead.';
    }
    if (error.code === 'auth/invalid-email') {
      return 'Please enter a valid email address.';
    }
    // For other authentication errors, log but allow to continue to avoid blocking valid registrations
    console.warn('Firebase Auth validation had an issue:', error.code, error.message);
    return ''; // Allow to continue if there's an unexpected error
  }
};

// Move calculatePasswordStrength outside component to prevent re-creation
const calculatePasswordStrength = (password) => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^A-Za-z0-9]/.test(password)
  };

  const metRequirements = Object.values(requirements).filter(Boolean).length;
  
  return { requirements, strength: metRequirements };
};

const OAuthConsentIndicator = ({ provider }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`oauth-consent-indicator ${isExpanded ? 'expanded' : ''}`}>
      <div className="oauth-consent-header" onClick={toggleExpanded}>
        <div className="oauth-consent-header-content">
          <span className="oauth-consent-icon">🔐</span>
          <h4 className="oauth-consent-title">Secure OAuth Authentication</h4>
        </div>
        {!isExpanded && (
          <div className="oauth-consent-status">
            <span className="oauth-consent-status-icon">✅</span>
            <span>Secure</span>
          </div>
        )}
        <button 
          type="button"
          className={`oauth-consent-toggle ${isExpanded ? 'expanded' : ''}`}
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          ▼
        </button>
      </div>
      <div className={`oauth-consent-features ${isExpanded ? 'expanded' : ''}`}>
        <div className="oauth-consent-item">
          <span className="oauth-consent-icon">✅</span>
          <span className="oauth-consent-text">
            Permission consent required for profile access
          </span>
        </div>
        <div className="oauth-consent-item">
          <span className="oauth-consent-icon">🛡️</span>
          <span className="oauth-consent-text">
            Your data remains secure and private
          </span>
        </div>
        <div className="oauth-consent-item">
          <span className="oauth-consent-icon">🔑</span>
          <span className="oauth-consent-text">
            Industry-standard OAuth 2.0 protocol
          </span>
        </div>
        {provider && (
          <div className="oauth-consent-item">
            <span className="oauth-consent-icon">🌐</span>
            <span className="oauth-consent-text">
              Powered by <span className="oauth-provider-name">{provider}</span> secure infrastructure
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const RegisterFirebase = () => {
  const navigate = useNavigate();

  // Form state management
  const [currentStep, setCurrentStep] = useState(1);
  const [activeEmojiCategory, setActiveEmojiCategory] = useState('smileys');
  const [isOAuthUser, setIsOAuthUser] = useState(false);
  const [oauthUserData, setOauthUserData] = useState(null);
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

  // Add specific loading states for each OAuth provider
  const [loadingStates, setLoadingStates] = useState({
    google: false,
    github: false,
    email: false
  });

  // Modal state
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Password state
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [justCompletedStep, setJustCompletedStep] = useState(null);

  // Refs
  const formRef = useRef(null);
  const usernameGeneratedRef = useRef(false);

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

  // When reaching profile step, suggest a username based on first and last name
  useEffect(() => {
    if (currentStep === 4 && !formData.username && formData.firstName && formData.lastName && !usernameGeneratedRef.current) {
      // Generate username suggestion based on first and last name
      const suggestedUsername = `${formData.firstName.toLowerCase()}_${formData.lastName.toLowerCase()}`;
      setFormData(prev => ({
        ...prev,
        username: suggestedUsername
      }));
      usernameGeneratedRef.current = true;
    }
    
    // Reset the ref when step changes away from 4
    if (currentStep !== 4) {
      usernameGeneratedRef.current = false;
    }
  }, [currentStep, formData.firstName, formData.lastName]); // Remove formData.username from dependencies

  // Get password requirements status - Memoized to prevent infinite re-renders
  const passwordRequirements = useMemo(() => {
    if (!formData.password) {
      return {
        length: false,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false
      };
    }
    const result = calculatePasswordStrength(formData.password);
    return result.requirements;
  }, [formData.password]);

  // Check if password meets all requirements
  const isPasswordValid = () => {
    return Object.values(passwordRequirements).every(Boolean);
  };

  // Create a stable debounced function for email validation
  const debouncedValidateEmail = useCallback(
    debounce(async (email) => {
      if (email && email.includes('@') && email.includes('.')) {
        setIsEmailChecking(true);
        try {
          const error = await validateEmailAsync(email);
          setFormErrors(prev => ({ 
            ...prev, 
            email: error,
            emailHighlight: !!error 
          }));
        } catch (err) {
          console.error("Email validation error:", err);
          setFormErrors(prev => ({ 
            ...prev, 
            email: 'Error checking email. Please try again.',
            emailHighlight: true
          }));
        } finally {
          setIsEmailChecking(false);
        }
      }
    }, 1000), // Increased debounce delay to reduce API calls
    []
  );

  // Handle input changes - Completely rewritten to prevent infinite re-renders
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // Mark form as modified once user starts entering data
    setFormModified(true);

    // Update form data and get the updated values for validation
    let updatedFormData;
    setFormData((prev) => {
      updatedFormData = { ...prev, [name]: newValue };
      
      // Handle name concatenation for firstName/lastName
      if (name === 'firstName' || name === 'lastName') {
        const firstName = name === 'firstName' ? newValue : prev.firstName;
        const lastName = name === 'lastName' ? newValue : prev.lastName;
        updatedFormData.name = `${firstName} ${lastName}`.trim();
      }
      
      return updatedFormData;
    });

    // Handle password strength calculation separately to avoid circular dependencies
    if (name === 'password') {
      const strengthResult = calculatePasswordStrength(newValue);
      setPasswordStrength(strengthResult.strength);
    }

    // Handle validation using the updated form data
    setFormErrors((prev) => {
      const newErrors = { ...prev, [name]: '', emailHighlight: false };
      
      // Handle password validations
      if (name === 'password') {
        const passwordErrors = validatePassword(newValue);
        if (passwordErrors.length > 0) {
          newErrors.password = passwordErrors.join(', ');
        }
        
        // Check confirm password mismatch using updated data
        if (updatedFormData.confirmPassword && newValue !== updatedFormData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
      
      // Handle confirm password validation
      if (name === 'confirmPassword') {
        if (newValue && newValue !== updatedFormData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
      
      // Handle email validation
      if (name === 'email' && newValue.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newValue)) {
          newErrors.email = 'Please enter a valid email address';
        }
      }
      
      return newErrors;
    });
  }, [debouncedValidateEmail]);

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

  // Check username availability - Memoized to prevent re-creation
  const checkIfUsernameExists = useCallback(async (username) => {
    try {
      const { checkUsernameExists, hasFirestorePermissions } = await import('../../firebase/firestore');
      
      // Only attempt check if we have permissions
      if (!hasFirestorePermissions()) {
        console.warn('Skipping username check - Firestore permissions denied');
        return false;
      }
      
      if (checkUsernameExists) {
        const exists = await checkUsernameExists(username);
        return exists;
      }
      return false;
    } catch (error) {
      console.error("Error checking username:", error);
      
      // If it's a permission error, don't block the user
      if (error.code === 'permission-denied') {
        console.warn('Username check permission denied. Allowing registration to proceed.');
        return false;
      }
      
      setFormErrors(prev => ({
        ...prev,
        username: 'Could not verify username availability. Please try again.'
      }));
      return false;
    }
  }, []);

  // Step validation with enhanced password requirements - Fixed dependencies
  const validateStep = useCallback(async (step, currentFormData = formData) => {
    const errors = {};
    
    console.log(`Validating step ${step} with isOAuthUser: ${isOAuthUser}`);
    
    if (step === 1) {
      if (!currentFormData.firstName.trim()) errors.firstName = 'First name is required';
      if (!currentFormData.lastName.trim()) errors.lastName = 'Last name is required';
      if (!currentFormData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(currentFormData.email)) {
        errors.email = 'Email is invalid';
      }
    } else if (step === 2) {
      if (!currentFormData.usagePurpose.trim()) errors.usagePurpose = 'Usage purpose is required';
      if (!currentFormData.referralSource.trim()) errors.referralSource = 'Referral source is required';
    } else if (step === 3) {
      // Skip password validation for OAuth users
      if (!isOAuthUser) {
        console.log('Validating password for non-OAuth user');
        const passwordErrors = validatePassword(currentFormData.password);
        if (passwordErrors.length > 0) {
          errors.password = passwordErrors.join(', ');
        }
        if (!currentFormData.confirmPassword) {
          errors.confirmPassword = 'Please confirm your password';
        } else if (currentFormData.password !== currentFormData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
      } else {
        console.log('Skipping password validation for OAuth user');
      }
    } else if (step === 4) {
      if (!currentFormData.username.trim()) errors.username = 'Username is required';
      if (currentFormData.bio && currentFormData.bio.length > 160) errors.bio = 'Bio must be 160 characters or less';
      if (!termsAccepted) errors.terms = 'You must accept the Terms of Service and Privacy Policy to continue';
    }
    
    console.log(`Step ${step} validation errors:`, errors);
    return errors;
  }, [isOAuthUser, termsAccepted]); // Include isOAuthUser in dependencies

  // Step navigation with scroll to top
  const handleNextStep = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("handleNextStep called for step:", currentStep);
    console.log("isSubmitting:", isSubmitting);
    console.log("isOAuthUser:", isOAuthUser);

    // Prevent multiple submissions
    if (isSubmitting) {
      console.log("Already submitting, returning");
      return;
    }

    setIsSubmitting(true);
    console.log("Starting validation for step:", currentStep);

    try {
      // For OAuth users or regular users, handle each step appropriately
      if (currentStep === 1) {
        if (!isOAuthUser) {
          // Regular email/password registration - validate email
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

          // Check other basic fields first
          if (Object.keys(basicErrors).length > 0) {
            setFormErrors(basicErrors);
            setIsSubmitting(false);
            return;
          }

          // CRITICAL FIX: Show loading state and wait for email validation
          setIsEmailChecking(true);
          setFormErrors({}); // Clear any previous errors
          
          try {
            console.log("Starting email availability check for:", formData.email);
            const emailError = await validateEmailAsync(formData.email);
            console.log("Email validation result:", emailError);
            
            if (emailError) {
              console.log("Email is already registered! Blocking progression.");
              setFormErrors({
                email: emailError,
                emailHighlight: true
              });
              setIsEmailChecking(false);
              setIsSubmitting(false);
              return; // CRITICAL: Block progression here
            }

            // If we get here, email is available
            console.log("Email is available, proceeding to step 2");
            setFormErrors({});
            setIsEmailChecking(false);
            setCurrentStep(2);
            setIsSubmitting(false);
            return;

          } catch (error) {
            console.error("Email validation error:", error);
            setFormErrors({
              email: 'There was a problem verifying this email. Please try again.',
              emailHighlight: true
            });
            setIsEmailChecking(false);
            setIsSubmitting(false);
            return;
          }
        } else {
          // OAuth user already validated, move to step 2
          console.log("OAuth user moving from step 1 to step 2");
          setFormErrors({});
          setCurrentStep(2);
          setIsSubmitting(false);
          return;
        }
      } else {
        // For other steps (2, 3, 4), use regular validation
        console.log("Validating step using regular validation");
        const errors = await validateStep(currentStep, formData);
        console.log("Validation result:", errors);
        
        if (Object.keys(errors).length > 0) {
          console.log("Validation failed with errors:", errors);
          setFormErrors(errors);
          setIsSubmitting(false);
          return;
        }

        // Clear errors and move to next step
        console.log("Validation passed, moving to next step");
        setFormErrors({});
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          console.log(`Moving from step ${prev} to step ${nextStep}`);
          return nextStep;
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error in handleNextStep:", error);
      setFormErrors({
        general: 'An unexpected error occurred. Please try again.'
      });
      setIsSubmitting(false);
    }
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => prev - 1);
    
    // Scroll to top when going to previous step
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
      
      // Alternative scroll methods
      const formContainer = document.querySelector('.register-form-container');
      if (formContainer) {
        formContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 50);
  };

  // Final submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await validateStep(4, formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    
    try {
      if (isOAuthUser && oauthUserData) {
        // For OAuth users, we already have an authenticated user
        console.log('🔄 Processing OAuth user registration...');
        
        try {
          const saveResult = await saveUserProfile(oauthUserData.uid, {
            ...formData,
            uid: oauthUserData.uid,
            provider: oauthUserData.provider,
            photoURL: oauthUserData.photoURL,
            registrationComplete: true,
            registrationStep: 5,
            createdAt: new Date().toISOString(),
            updatedAt: new Date(),
          });
          
          console.log('✅ OAuth user profile saved:', saveResult);
          
          // Clear the OAuth registration flag
          sessionStorage.removeItem('oauthRegistrationInProgress');
          
          setCurrentStep(5);
          setTimeout(() => navigate('/app'), 2000);
          
        } catch (profileError) {
          console.error('❌ Error saving OAuth user profile:', profileError);
          
          if (profileError.code === 'permission-denied') {
            console.warn('🚫 Permission denied but OAuth user is authenticated - proceeding with limited profile');
            
            // Clear the OAuth registration flag and proceed
            sessionStorage.removeItem('oauthRegistrationInProgress');
            
            // Show success even with permission error since user is authenticated
            setCurrentStep(5);
            setTimeout(() => navigate('/app'), 2000);
          } else {
            throw profileError; // Re-throw non-permission errors
          }
        }
        
      } else {
        // For regular email/password users, create a new account
        console.log("=== FINAL EMAIL VALIDATION BEFORE ACCOUNT CREATION ===");
        setIsEmailChecking(true);
        
        try {
          const finalEmailError = await validateEmailAsync(formData.email);
          console.log("Final email validation result:", finalEmailError);
          
          if (finalEmailError) {
            console.log("❌ Email validation failed at final check:", finalEmailError);
            setFormErrors({ 
              email: finalEmailError,
              emailHighlight: true,
              general: 'Please go back to step 1 and use a different email address.'
            });
            setIsEmailChecking(false);
            setIsSubmitting(false);
            setCurrentStep(1);
            return;
          }

          const userCredential = await createUserWithEmailAndPassword(getAuth(), formData.email, formData.password);
          await updateProfile(userCredential.user, { displayName: formData.username });
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

        } catch (emailCheckError) {
          console.error("❌ Final email validation error:", emailCheckError);
          setFormErrors({
            email: 'There was an error validating your email. Please try again.',
            emailHighlight: true
          });
          setIsEmailChecking(false);
          setIsSubmitting(false);
          setCurrentStep(1); // Force back to step 1
          return;
        }
      }
    } catch (error) {
      console.error("❌ Registration error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      setIsEmailChecking(false);
      
      if (error.code === 'auth/email-already-in-use') {
        console.log("❌ Email already in use error caught at account creation");
        setFormErrors({
          email: 'This email is already registered. Please use a different email or try logging in instead.',
          emailHighlight: true,
          general: 'The email address is already associated with another account.'
        });
        // Force user back to step 1 to change email
        setCurrentStep(1);
      } else if (error.code === 'auth/weak-password') {
        setFormErrors({ 
          password: 'Password is too weak. Please choose a stronger password.',
          general: 'Please choose a stronger password.'
        });
        setCurrentStep(3); // Go back to password step
      } else if (error.code === 'auth/invalid-email') {
        setFormErrors({ 
          email: 'Please enter a valid email address.',
          emailHighlight: true
        });
        setCurrentStep(1); // Go back to email step
      } else if (error.code === 'permission-denied') {
        setFormErrors({
          general: 'You do not have permission to complete this action. Please contact support.',
        });
      } else {
        setFormErrors({ 
          general: `Registration failed: ${error.message}. Please try again.`,
          auth: error.message 
        });
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

  // OAuth handlers
  const handleGoogleSignUp = async () => {
    setIsSubmitting(true);
    setFormErrors({});
    
    // Set specific loading state for Google
    setLoadingStates(prev => ({ ...prev, google: true }));

    try {
      // Set flag to prevent UserContext from redirecting during OAuth registration
      sessionStorage.setItem('oauthRegistrationInProgress', 'true');
      
      const provider = new GoogleAuthProvider();
      
      // Add comprehensive scopes to ensure proper consent screen
      provider.addScope('profile');
      provider.addScope('email');
      provider.addScope('openid');
      
      // Set custom parameters to force consent and account selection
      provider.setCustomParameters({
        prompt: 'consent select_account',
        access_type: 'offline',
        include_granted_scopes: 'true',
        response_type: 'code'
      });
      
      console.log('Starting Google OAuth sign-up with consent...');
      const result = await signInWithPopup(getAuth(), provider);
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      console.log('Google OAuth successful, user:', user);

      // Extract user data from Google profile
      const displayName = user.displayName || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Set OAuth user data and form data
      setIsOAuthUser(true);
      setOauthUserData({
        uid: user.uid,
        email: user.email,
        provider: 'google',
        photoURL: user.photoURL,
        accessToken: credential?.accessToken
      });

      setFormData(prev => ({
        ...prev,
        firstName,
        lastName,
        name: displayName,
        email: user.email,
        avatarType: user.photoURL ? 'image' : 'initials',
        avatarImage: user.photoURL || '',
        username: user.email ? user.email.split('@')[0] : '' // Suggest username from email
      }));

      // Mark form as modified
      setFormModified(true);
      
      // Skip to step 2 since step 1 (account info) is already filled
      console.log('Moving to step 2 after Google OAuth...');
      setCurrentStep(2);
      setIsSubmitting(false);
      setLoadingStates(prev => ({ ...prev, google: false }));
      
    } catch (error) {
      console.error('Google sign-up error:', error);
      
      // Clear OAuth registration flag on error
      sessionStorage.removeItem('oauthRegistrationInProgress');
      
      // Reset states properly on any error
      setIsOAuthUser(false);
      setOauthUserData(null);
      
      // Handle specific OAuth errors
      if (error.code === 'auth/popup-closed-by-user') {
        setFormErrors({ oauth: 'Sign-up was cancelled. Please try again.' });
      } else if (error.code === 'auth/popup-blocked') {
        setFormErrors({ oauth: 'Pop-up was blocked. Please allow pop-ups and try again.' });
      } else if (error.code === 'auth/cancelled-popup-request') {
        setFormErrors({ oauth: 'Another sign-up attempt is in progress.' });
      } else {
        setFormErrors({ oauth: `Google sign-up failed: ${error.message}` });
      }
      
      setIsSubmitting(false);
      setLoadingStates(prev => ({ ...prev, google: false }));
    }
  };

  const handleGitHubSignUp = async () => {
    setIsSubmitting(true);
    setFormErrors({});
    
    // Set specific loading state for GitHub
    setLoadingStates(prev => ({ ...prev, github: true }));

    try {
      sessionStorage.setItem('oauthRegistrationInProgress', 'true');
      
      const provider = new GithubAuthProvider();
      
      // Add scopes for GitHub
      provider.addScope('user:email');
      provider.addScope('read:user');
      
      // Set custom parameters for GitHub
      provider.setCustomParameters({
        allow_signup: 'true'
      });
      
      console.log('Starting GitHub OAuth sign-up...');
      const result = await signInWithPopup(getAuth(), provider);
      const user = result.user;
      const credential = GithubAuthProvider.credentialFromResult(result);
      
      console.log('GitHub OAuth successful, user:', user);

      const displayName = user.displayName || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      setIsOAuthUser(true);
      setOauthUserData({
        uid: user.uid,
        email: user.email,
        provider: 'github',
        photoURL: user.photoURL,
        accessToken: credential?.accessToken
      });

      setFormData(prev => ({
        ...prev,
        firstName,
        lastName,
        name: displayName,
        email: user.email,
        avatarType: user.photoURL ? 'image' : 'initials',
        avatarImage: user.photoURL || '',
        username: user.email ? user.email.split('@')[0] : ''
      }));

      setFormModified(true);
      setCurrentStep(2);
      setIsSubmitting(false);
      setLoadingStates(prev => ({ ...prev, github: false }));
      
    } catch (error) {
      console.error('GitHub sign-up error:', error);
      sessionStorage.removeItem('oauthRegistrationInProgress');
      
      setIsOAuthUser(false);
      setOauthUserData(null);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setFormErrors({ oauth: 'Sign-up was cancelled. Please try again.' });
      } else if (error.code === 'auth/popup-blocked') {
        setFormErrors({ oauth: 'Pop-up was blocked. Please allow pop-ups and try again.' });
      } else {
        setFormErrors({ oauth: `GitHub sign-up failed: ${error.message}` });
      }
      
      setIsSubmitting(false);
      setLoadingStates(prev => ({ ...prev, github: false }));
    }
  };

  // Handle step change animation with enhanced effects and scroll to top
  useEffect(() => {
    // Reset animation when step changes
    setAnimateIn(false);
    
    // Scroll to top of the form when step changes
    if (formRef.current) {
      formRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
    
    // Alternative scroll method if the form ref doesn't work
    const formContainer = document.querySelector('.register-form-container');
    if (formContainer) {
      formContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Also scroll the window to ensure visibility
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // If moving forward (not initial mount), mark the previous step as just completed
    if (currentStep > 1) {
      setJustCompletedStep(currentStep - 1);
      setTimeout(() => setJustCompletedStep(null), 1000); // Clear after animation
    }
    
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100); // Slightly longer delay to ensure scroll completes
    
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Enhanced Stepper UI with animated elements
  const renderStepper = () => (
    <div className="register-steps-container">
      <div className="register-steps">
        {steps.map((label, idx) => (
          <React.Fragment key={`step-${idx}-${label}`}>
            <div 
              className={`step-container 
                ${currentStep === idx + 1 ? 'active' : ''} 
                ${currentStep > idx + 1 ? 'completed' : ''}
                ${justCompletedStep === idx + 1 ? 'just-completed' : ''}`
              }
            >
              <div className="step-indicator">
                {currentStep > idx + 1 ? (
                  <span className="step-check">✓</span>
                ) : (
                  <span className="step-number">{idx + 1}</span>
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

            {/* OAuth Sign Up Buttons */}
            <div className="oauth-section">
              <div className="divider">
                <span className="divider-text">or sign up with</span>
              </div>

              {formErrors.oauth && (
                <div className="oauth-error">
                  <span>⚠️</span>
                  {formErrors.oauth}
                </div>
              )}

              <div className="oauth-buttons">
                {/* Google Sign Up */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="oauth-btn google-btn"
                  disabled={isSubmitting || loadingStates.google || loadingStates.github}
                  data-oauth-consent="true"
                >
                  <div className="oauth-btn-content">
                    {loadingStates.google ? (
                      <div className="btn-loading-spinner"></div>
                    ) : (
                      <svg className="oauth-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    <span>{loadingStates.google ? 'Connecting...' : 'Continue with Google'}</span>
                  </div>
                </button>

                {/* GitHub Sign Up */}
                <button
                  type="button"
                  onClick={handleGitHubSignUp}
                  className="oauth-btn github-btn"
                  disabled={isSubmitting || loadingStates.google || loadingStates.github}
                  data-oauth-consent="true"
                >
                  <div className="oauth-btn-content">
                    {loadingStates.github ? (
                      <div className="btn-loading-spinner"></div>
                    ) : (
                      <svg className="oauth-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    <span>{loadingStates.github ? 'Connecting...' : 'Continue with GitHub'}</span>
                  </div>
                </button>
              </div>
              
              <OAuthConsentIndicator />

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
                  <div className="card-subtitle">This helps us customize your dashboard and features</div>
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
                      <option value="Personal Task Management">📝 Personal Task Management</option>
                      <option value="Work Projects">💼 Work Projects</option>
                      <option value="Student Assignments">🎓 Student Assignments</option>
                      <option value="Team Collaboration">👥 Team Collaboration</option>
                      <option value="Event Planning">🎉 Event Planning</option>
                      <option value="Other">🌐 Other</option>
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
                  <div className="card-subtitle">Help us understand how people discover Tasklio</div>
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
                      <option value="Search Engine">🔍 Search Engine (Google, Bing, etc.)</option>
                      <option value="Social Media">📱 Social Media (Twitter, LinkedIn, etc.)</option>
                      <option value="Friend or Colleague">👥 Friend or Colleague</option>
                      <option value="Blog or Article">📄 Blog or Article</option>
                      <option value="Advertisement">📺 Advertisement</option>
                      <option value="App Store">📱 App Store</option>
                      <option value="Other">🌐 Other</option>
                    </select>
                    {formData.referralSource && <div className="success-indicator">✓</div>}
                    {formErrors.referralSource && <div className="error-message">{formErrors.referralSource}</div>}
                  </div>
                </div>
              </div>

              <div className="personalization-preview">
                <div className="preview-header">
                  <div className="preview-icon">✨</div>
                  <div className="preview-title">Your Personalized Experience</div>
                </div>
                <div className="preview-content">
                  {formData.usagePurpose && (
                    <div className="preview-item">
                      <div className="preview-item-icon">🎯</div>
                      <div className="preview-item-text">
                        Optimized for <strong>{formData.usagePurpose}</strong>
                      </div>
                    </div>
                  )}
                  {formData.referralSource && (
                    <div className="preview-item">
                      <div className="preview-item-icon">📊</div>
                      <div className="preview-item-text">
                        Discovered via <strong>{formData.referralSource}</strong>
                      </div>
                    </div>
                  )}
                  {!formData.usagePurpose && !formData.referralSource && (
                    <div className="preview-placeholder">
                      <div className="placeholder-text">Tell us about yourself to see your personalized setup</div>
                    </div>
                  )}
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
                <h2 className="security-title">
                  {isOAuthUser ? 'Account Security' : 'Secure Your Account'}
                </h2>
                <p className="security-subtitle">
                  {isOAuthUser 
                    ? 'Your account is secured through OAuth authentication' 
                    : 'Create a strong password to protect your data'
                  }
                </p>
              </div>

              {isOAuthUser ? (
                // OAuth users - show security confirmation instead of password fields
                <div className="oauth-security-section">
                  <div className="oauth-security-card">
                    <div className="oauth-security-header">
                      <div className="oauth-security-icon">✅</div>
                      <h3>Your Account is Secure</h3>
                    </div>
                    
                    <div className="oauth-security-content">
                      <div className="oauth-provider-info">
                        <div className="provider-badge">
                          {oauthUserData?.provider === 'google' ? (
                            <>
                              <svg className="provider-icon" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              </svg>
                              <span>Secured with Google</span>
                            </>
                          ) : (
                            <>
                              <svg className="provider-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              <span>Secured with GitHub</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="security-features">
                        <div className="security-feature">
                          <div className="feature-icon">🔐</div>
                          <div className="feature-text">
                            <strong>Two-Factor Authentication</strong>
                            <span>Protected by your OAuth provider's security</span>
                          </div>
                        </div>
                        
                        <div className="security-feature">
                          <div className="feature-icon">🛡️</div>
                          <div className="feature-text">
                            <strong>Enterprise-grade Security</strong>
                            <span>Industry-standard OAuth 2.0 protection</span>
                          </div>
                        </div>
                        
                        <div className="security-feature">
                          <div className="feature-icon">🔄</div>
                          <div className="feature-text">
                            <strong>Automatic Updates</strong>
                            <span>Security managed by your OAuth provider</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular users - show password creation fields
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
                      <div className="password-error">
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
                              width: `${(passwordStrength / 5) * 100}%`,
                              background: passwordStrength <= 1 ? '#ef4444' :
                                         passwordStrength <= 2 ? '#f59e0b' :
                                         passwordStrength <= 3 ? '#3b82f6' : '#10b981'
                            }}
                          ></div>
                        </div>
                        <div className={`strength-text ${
                          passwordStrength <= 1 ? 'weak' :
                          passwordStrength <= 2 ? 'medium' :
                          passwordStrength <= 3 ? 'good' : 'strong'
                        }`}>
                          <span>{passwordStrength <= 1 ? '🔴' :
                                 passwordStrength <= 2 ? '🟡' :
                                 passwordStrength <= 3 ? '🔵' : '🟢'}</span>
                          {passwordStrength <= 1 ? 'Weak' :
                           passwordStrength <= 2 ? 'Fair' :
                           passwordStrength <= 3 ? 'Good' : 'Strong'}
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
                      <div className="password-error">
                        <span>⚠️</span>
                        {formErrors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="security-tips">
                    <div className="security-tips-header">
                      <div className="tips-icon">💡</div>
                      <div className="tips-title">Security Tips</div>
                    </div>

                    <div className="tips-list">
                      <div className={`tip-item ${passwordRequirements.length ? 'completed' : ''}`}>
                        <div className={`tip-icon ${passwordRequirements.length ? 'completed' : ''}`}>✓</div>
                        <div className="tip-text">8+ characters</div>
                      </div>
                      <div className={`tip-item ${passwordRequirements.uppercase && passwordRequirements.lowercase ? 'completed' : ''}`}>
                        <div className={`tip-icon ${passwordRequirements.uppercase && passwordRequirements.lowercase ? 'completed' : ''}`}>✓</div>
                        <div className="tip-text">Mix case letters</div>
                      </div>
                      <div className={`tip-item ${passwordRequirements.numbers ? 'completed' : ''}`}>
                        <div className={`tip-icon ${passwordRequirements.numbers ? 'completed' : ''}`}>✓</div>
                        <div className="tip-text">Add numbers</div>
                      </div>
                      <div className={`tip-item ${passwordRequirements.symbols ? 'completed' : ''}`}>
                        <div className={`tip-icon ${passwordRequirements.symbols ? 'completed' : ''}`}>✓</div>
                        <div className="tip-text">Use symbols</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                <p className="profile-hero-subtitle">Customize your profile experience and make it uniquely yours</p>
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
                  <div className="profile-form-section">
                    <div
                      className="terms-checkbox-wrapper"
                      onClick={() => setTermsAccepted(!termsAccepted)}
                    >
                      <div className={`custom-checkbox ${termsAccepted ? 'checked' : ''}`}>
                        <span className="checkbox-checkmark">✓</span>
                      </div>
                      <div className="terms-text">
                        I agree to{' '}
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
                        . I understand that my data will be securely stored and processed according to these terms.
                      </div>
                    </div>
                    {formErrors.terms && <div className="error-message">{formErrors.terms}</div>}
                  </div>

                  {/* Complete Registration Button */}
                  <div className="complete-registration-container">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="go-previous-btn"
                      disabled={isSubmitting}
                    >
                      <span className="button-icon">←</span>
                      Previous
                    </button>
                    
                    <button
                      type="submit"
                      className="complete-registration-btn"
                      disabled={isSubmitting || !termsAccepted}
                      onClick={(e) => {
                        console.log("Complete registration button clicked");
                        console.log("Terms accepted:", termsAccepted);
                        console.log("Is submitting:", isSubmitting);
                        if (!isSubmitting && termsAccepted) {
                          handleSubmit(e);
                        }
                      }}
                      style={{
                        background: (!isSubmitting && termsAccepted) 
                          ? 'linear-gradient(135deg, #10b981, #059669)' 
                          : '#9ca3af',
                        color: 'white',
                        border: 'none',
                        cursor: (!isSubmitting && termsAccepted) ? 'pointer' : 'not-allowed',
                        pointerEvents: 'auto',
                        boxShadow: (!isSubmitting && termsAccepted) 
                          ? '0 3px 8px rgba(16, 185, 129, 0.25)' 
                          : 'none'
                      }}
                    >
                      <div className="btn-content">
                        {isSubmitting ? (
                          <>
                            <div className="btn-loading-spinner"></div>
                            <span>Creating...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete</span>
                            <span className="button-icon">🚀</span>
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
            <p className="success-message">Your account has been created successfully. Welcome!</p>
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-form-section">
          <div className="register-form-container">
            <div className="auth-header">
              <button type="button" className="back-to-home" onClick={handleBackClick}>
                <span className="back-icon">←</span>
                <span className="back-text">Back to Home</span>
              </button>
            </div>

            {/* Enhanced stepper with animations */}
            {currentStep < 5 && renderStepper()}

            <form ref={formRef} onSubmit={currentStep === 4 ? handleSubmit : handleNextStep}>
              {renderStepContent()}
              {currentStep < 4 && (
                <div className="auth-buttons">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("Previous button clicked");
                        handlePrevStep(e);
                      }}
                      className="auth-button back-button"
                      disabled={isSubmitting || loadingStates.google || loadingStates.github}
                    >
                      <span className="button-icon">←</span>
                      Previous
                    </button>
                  )}
                  <button
                    type="submit"
                    className="auth-button next-button"
                    disabled={isSubmitting || isEmailChecking || loadingStates.google || loadingStates.github}
                    style={{ 
                      pointerEvents: (isSubmitting || isEmailChecking || loadingStates.google || loadingStates.github) ? 'none' : 'auto',
                      cursor: (isSubmitting || isEmailChecking || loadingStates.google || loadingStates.github) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {(isSubmitting || isEmailChecking || loadingStates.google || loadingStates.github) ? (
                      <>
                        <div className="btn-loading-spinner"></div>
                        <span>
                          {isEmailChecking ? 'Checking email...' : 
                           loadingStates.google ? 'Connecting to Google...' :
                           loadingStates.github ? 'Connecting to GitHub...' : 
                           'Processing...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <span className="button-icon">→</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>

            {/* Exit Warning Modal */}
            {showExitWarning && (
              <div className="exit-warning-overlay">
                <div className="exit-warning-modal">
                  <div className="exit-warning-content">
                    <h3>Are you sure you want to leave?</h3>
                    <p>Your progress will be lost if you leave this page.</p>
                    <div className="exit-warning-buttons">
                      <button onClick={handleConfirmExit} className="exit-button">
                        Yes, Leave
                      </button>
                      <button onClick={handleCancelExit} className="cancel-button">
                        Stay Here
                      </button>
                     </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="register-mockup-section register-mockup-background">
          <RegistrationMockup currentStep={currentStep} />
        </div>
      </div>

      {/* MODALS - All modals outside main container for proper z-index hierarchy */}
      
      {/* Profile Avatar Modal - HIGHEST PRIORITY FOR PROFILE EDITING */}
      {showAvatarModal && (
        <ProfilePictureModal
          isOpen={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          firstName={formData.firstName}
          lastName={formData.lastName}
          initialValue={{
            icon: formData.avatarEmoji || '😎',
            color: formData.color || '#5b5ef4',
            initial: formData.firstName ? formData.firstName.charAt(0).toUpperCase() : 'T',
            customImage: formData.avatarImage || null
          }}
          colors={colors}
          onSave={(profileData) => {
            console.log('Profile data saved:', profileData);
            setFormData(prev => ({
              ...prev,
              avatarType: profileData.type === 'icons' ? 'emoji' : profileData.type === 'initials' ? 'initials' : 'image',
              avatarEmoji: profileData.icon,
              color: profileData.color,
              avatarImage: profileData.customImage
            }));
            setShowAvatarModal(false);
          }}
        />
      )}

      {/* Exit Warning Modal with proper z-index */}
      {showExitWarning && (
        <ConfirmationModal
          isOpen={showExitWarning}
          onClose={handleCancelExit}
          onConfirm={handleConfirmExit}
          title="Are you sure you want to leave?"
          message="Your progress will be lost if you leave this page."
          confirmText="Yes, Leave"
          cancelText="Stay"
          confirmButtonClass="confirm-danger"
          icon="⚠️"
        />
      )}

      {/* Terms Modal */}
      {showTermsModal && (
        <TermsModal 
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        />
      )}
      {/* Privacy Modal */}
      {showPrivacyModal && (
        <PrivacyModal 
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
        />
      )}
    </div>
  );
}

export default RegisterFirebase;