import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmail, checkEmailExists, checkUsernameExists } from '../../supabase/auth';
import { useUser } from '../../contexts/UserContext';
import './styles/Register.css';
import RegistrationMockups from './components/RegistrationMockups';
import ProfilePictureModal from './components/ProfilePictureModal';

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
    profileVisibility: 'public',
    icon: '👤', // Default profile icon
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [formIsDirty, setFormIsDirty] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState('');

  const { user, loginUser } = useUser();
  const navigate = useNavigate();
  const formRef = useRef(null);

  // Predefined avatar colors - expanded with more options
  const colors = [
    // Original colors
    '#5b5ef4', // indigo
    '#10b981', // emerald
    '#ec4899', // pink
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#06b6d4', // cyan
    '#475569', // slate
    // New colors
    '#3b82f6', // blue
    '#0ea5e9', // sky blue
    '#14b8a6', // teal
    '#f59e0b', // amber
    '#f97316', // orange
    '#84cc16', // lime
    '#22c55e', // green
    '#d946ef', // fuchsia
    '#8b5cf6', // purple
    '#6366f1', // indigo
    '#a855f7', // purple
    '#ec4899', // pink
    '#f43f5e', // rose
    '#64748b', // slate
    '#334155', // dark slate
    '#1e293b', // darker slate
  ];

 // Categorized profile icons
const profileIconCategories = {
  people: [
    '👤', '👨', '👩', '👦', '👧', '👨‍💼', '👩‍💼',
    '👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓', '🧑', '🧔',
    '👱', '👲', '👳', '👮', '👷', '💂', '🕵️',
    '👨‍⚕️', '👩‍⚕️', '👨‍🍳', '👩‍🍳', '👨‍🎨', '👩‍🎨',
    '👨‍✈️', '👩‍✈️', '🧙', '🦸', '🦹', '🧛', '🧟'
  ],
  faces: [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
    '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
    '🤓', '😎', '🧐', '🤠', '🥳', '😏', '😒', '😔',
    '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺',
    '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳',
    '🥵', '🥶', '😱', '😨', '😰', '😥', '😓'
  ],
  animals: [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
    '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
    '🐧', '🐦', '🦆', '🦅', '🦉', '🐺', '🐗', '🐴',
    '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟',
    '🦗', '🕷', '🦂', '🦔', '🦇'
  ],
  fantasy: [
    '👻', '👽', '👾', '🤖', '💩', '👹', '👺',
    '🤡', '💀', '☠️', '👀', '👁️', '🧠', '👑',
    '👒', '🎩', '🎭', '🔮', '🌟', '⭐', '🌈',
    '🌠', '🚀', '🌞', '🌙', '🪐', '✨'
  ],
  objects: [
    '📱', '💻', '⌚', '📷', '🎮', '🎧', '🎬',
    '🏆', '🎸', '🎹', '🥁', '🎯', '🎨', '🎭',
    '🎪', '🎟️', '🎫', '📚', '💼', '📝', '📅',
    '🔑', '💡', '📌', '📎', '✂️', '📐', '📏'
  ],
  transportation: [
    '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓',
    '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜',
    '🛴', '🚲', '🛵', '🏍️', '✈️', '🛩️', '🛫',
    '🛬', '🚁', '🚂', '🚆', '🚇', '🚊', '🚉', '🚞'
  ],
  food: [
    '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉',
    '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭',
    '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦',
    '🥬', '🥒', '🌶️', '🌽', '🥕', '🧄', '🧅',
    '🥔', '🍠', '🥐', '🍞', '🥖', '🧀', '🥚',
    '🍳', '🧈', '🥞', '🧇', '🥓', '🍗', '🍖'
  ],
  activities: [
    '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉',
    '🎱', '🏓', '🏸', '🥊', '🥋', '⛳', '🪁',
    '🏹', '🎣', '🤿', '🏂', '⛷️', '🏄', '🏊',
    '🚣', '🧗', '🚵', '🚴'
  ],
  symbols: [
    '❤️', '💔', '💕', '💖', '💗', '💘', '💝',
    '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️',
    '🔯', '🛐', '🕎', '☯️', '♻️', '⚛️', '🔔',
    '🕳️', '🌐', '🔒', '🔓'
  ],
  // …your existing categories…
  special: [
    // sparkles & celebrations
    '✨','🎉','🎊','🎈','🎆','🎇','🧨',
    // cosmic & weather
    '🌟','⭐','⚡','🔥','💥','💫','🌙','☀️','🌤️','⛈️','🌪️','🌈','❄️','💧','🌊',
    // mystic & symbols
    '🔮','🕯️','⚜️','🔱','☯️','✝️','☪️','🕉️','☸️','✡️','🔯','☦️',
    // zodiac
    '♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓',
    // chess pieces
    '♔','♕','♖','♗','♘','♙',
    // tools & science
    '⚙️','🔧','🔨','🛠️','⚗️','🧪','🧬','⚛️','☢️','☣️',
    // historic & religious
    '🗿','🏺','⛩️','🕍','🕌','🛕','⛪',
    // architecture
    '🏰','🏯','🏠','🏡','🏢','🏥','🏦','🏨','🏩','💒','🏛️',
    // flags & signs
    '🚩','🏳️','🏴','🏳️‍🌈','🎌','🚥','🚦','🛑','🚧','⚠️','🚸','⛔','🚳','🚭','🚯','🚱','🚷','📵','🔞',
    // mystical eyes & magic
    '👁️','👀','🧿','🪄',
    // nature & plants
    '🌿','🍀','🌵','🎋','🍂','🍃','🍁',
    // holiday & seasonal
    '🎃','🦃','🎄','🎅','🤶','🕎','🪔','🦚',
    // music & art
    '🎨','🎭','🎼','🎹','🥁','🎸','🎷','🎺','🎻',
    // transport & maps
    '🗺️','🧭','🏴‍☠️','🛸',
    // tech & media
    '📡','💽','💾','📀','📼','📷','📹','🔍','🖥️','🖨️',
    // quirky dingbats
    '✒️','✏️','✂️','📎','🖋️','📐','📏','🔖'
  ]
};


  // Flatten categories for backward compatibility
  const profileIcons = [
    ...profileIconCategories.people,
    ...profileIconCategories.faces,
    ...profileIconCategories.animals,
    ...profileIconCategories.fantasy,
    ...profileIconCategories.objects
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

  // Update validateStep1 to include email existence check
  const validateStep1 = async () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'Please enter your first name';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Please enter your last name';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    } else {
      // Check if email exists
      const result = await checkEmailExists(formData.email);

      if (result.errorChecking) {
        errors.email = 'Could not verify email availability. Please try again.';
      } else if (result.exists) {
        errors.email = 'This email is already registered. Please use a different email.';
      }
    }

    return errors;
  };

  // Fix the email verification function to properly handle errors
  const checkIfEmailExists = async (email) => {
    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return false; // Invalid email format, let regular validation handle it
    }

    try {
      console.log(`Verifying email: ${email}`);
      const result = await checkEmailExists(email);

      // Log the result for debugging
      console.log("Email verification result:", result);

      // If we got an error during the check, block progression for safety
      if (result.errorChecking) {
        console.warn("Email verification encountered an issue:", result.error);
        setFormErrors(prev => ({
          ...prev,
          email: 'Could not verify email availability. Please try again.'
        }));
        return true; // Return true to block progression (true means email exists or check failed)
      }

      // Return whether the email exists
      return result.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      setFormErrors(prev => ({
        ...prev,
        email: 'Could not verify email availability. Please try again.'
      }));
      return true; // Block progression on errors
    }
  };

  // Completely separate email validation from other validations
  const validateEmail = async (email) => {
    // Basic format validation
    if (!email || !email.trim()) {
      return 'Please enter your email address';
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address';
    }

    // Check if email already exists
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      return 'This email is already registered. Please log in instead or use a different email.';
    }

    return null; // No error
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

  // Validate Step 4 (Account Customization)
  const validateStep4 = async () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Please create a username';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else {
      // Check if username exists before proceeding
      try {
        const usernameExists = await checkIfUsernameExists(formData.username);
        if (usernameExists) {
          errors.username = 'This username is already taken. Please choose another one.';
        }
      } catch (error) {
        console.error("Error checking username:", error);
      }
    }

    return errors;
  };

  // Add a function to check if username exists
  const checkIfUsernameExists = async (username) => {
    try {
      const result = await checkUsernameExists(username);
      return result.exists;
    } catch (error) {
      console.error("Error checking username:", error);
      // Show a meaningful error to the user
      setFormErrors(prev => ({
        ...prev,
        username: 'Could not verify username availability. Please try again.'
      }));
      // Return false to prevent blocking progress on technical errors
      return false;
    }
  };

  // Update handleNextStep to await validateStep1
  const handleNextStep = async (e) => {
    e.preventDefault();

    let errors = {};
    setIsSubmitting(true);

    try {
      // Validate current step before proceeding
      if (currentStep === 1) {
        errors = await validateStep1();
      } else if (currentStep === 2) {
        errors = validateStep2();
      } else if (currentStep === 3) {
        errors = validateStep3();
      } else if (currentStep === 4) {
        errors = await validateStep4();
      }

      // Check if there are validation errors
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        shakeForm();
        setIsSubmitting(false);
        return; // Stop here and don't proceed to next step
      }

      // For the final step, handle the submission
      if (currentStep === 4) {
        await handleSubmit(e);
        return;
      }

      // If we reach this point, validation has passed
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Step validation error:", error);
      shakeForm();
      setIsSubmitting(false);
      // Show a general error message to the user
      setFormErrors({
        general: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a function to handle email verification
  const handleEmailVerification = (registrationResult) => {
    if (registrationResult.needsEmailVerification) {
      // Show email verification instructions
      setCurrentStep('verification');
      setVerificationEmail(formData.email);

      // Store verification status in local storage
      localStorage.setItem('pendingVerification', JSON.stringify({
        email: formData.email,
        userId: registrationResult.user.id,
        timestamp: new Date().toISOString()
      }));
    } else {
      // No verification needed, continue as normal
      navigate('/dashboard');
    }
  };

  // Handle previous step button without warning

  // Handle previous step button without warning
  const handlePrevStep = (e) => {
    e.preventDefault();
    // Simply go back to previous step without warnings
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // First validate the username and other step 4 fields
    const errors = await validateStep4();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      shakeForm();
      return;
    }

    // Check if email already exists before submitting
    try {
      setIsSubmitting(true);
      console.log("Checking email before submission: ", formData.email);
      const emailExists = await checkIfEmailExists(formData.email);

      if (emailExists) {
        setEmailAlreadyExists(true);
        setIsSubmitting(false);
        shakeForm();
        return;
      }

      // If email is valid, proceed with registration
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        color: formData.color,
        icon: formData.icon,
        username: formData.username,
        bio: formData.bio || '',
        referralSource: formData.referralSource,
        usagePurpose: formData.usagePurpose,
        referralCode: formData.referralCode || '',
        registrationComplete: true
      };

      await registerWithEmail(formData.email, formData.password, userData);
      loginUser(userData);

      // Navigate to app after successful registration
      navigate('/app');
    } catch (error) {
      console.error("Registration error:", error);

      // Handle duplicate account errors
      if (error.code === 'auth/email-already-in-use') {
        setEmailAlreadyExists(true);
        setFormErrors({});
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
    // Only show warning if user has entered data
    if (formIsDirty && (
        currentStep >= 2 ||
        formData.firstName?.trim() ||
        formData.lastName?.trim() ||
        formData.email?.trim())) {
      e.preventDefault();
      setPendingAction(() => () => {
        navigate('/');
      });
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

  // Handle icon selection
  const handleIconSelect = (icon) => {
    setFormData(prev => ({
      ...prev,
      icon
    }));
    setShowIconPicker(false);
  };

  // Toggle icon picker visibility
  const toggleIconPicker = () => {
    setShowIconPicker(!showIconPicker);
  };

  // Handle the profile picture modal opening
  const handleOpenProfileModal = () => {
    setShowProfileModal(true);
  };

  // Handle saving profile picture settings
  const handleSaveProfileSettings = (profileData) => {
    // Update form data with selected profile picture settings
    setFormData(prev => ({
      ...prev,
      icon: profileData.type === 'icons' ? profileData.icon : prev.icon,
      initial: profileData.type === 'initials' ? profileData.initial : prev.initial,
      color: profileData.color,
      customImage: profileData.type === 'upload' ? profileData.customImage : prev.customImage,
      profilePictureType: profileData.type
    }));
    setShowProfileModal(false);
  };

  // Add a function to handle email update
  const handleEmailUpdate = (e) => {
    setUpdatedEmail(e.target.value);

    // Clear errors when user types
    if (formErrors.updatedEmail) {
      setFormErrors(prev => ({
        updatedEmail: ''
      }));
    }
  };

  // Add or improve the saveUpdatedEmail function to handle email updates
  const saveUpdatedEmail = async () => {
    if (!updatedEmail.trim()) {
      setFormErrors(prev => ({
        ...prev,
        updatedEmail: 'Please enter your email address'
      }));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(updatedEmail)) {
      setFormErrors(prev => ({
        ...prev,
        updatedEmail: 'Please enter a valid email address'
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const emailExists = await checkIfEmailExists(updatedEmail);
      if (emailExists) {
        setFormErrors(prev => ({
          ...prev,
          updatedEmail: 'This email is also already registered. Please try another email address.'
        }));
        setIsSubmitting(false);
        return;
      }

      // Update the email in the form data
      setFormData(prev => ({
        ...prev,
        email: updatedEmail
      }));

      // Reset the emailAlreadyExists flag
      setEmailAlreadyExists(false);
      setUpdatedEmail('');
      setFormErrors({});
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error checking updated email:", error);
      setFormErrors(prev => ({
        ...prev,
        updatedEmail: 'Could not verify this email. Please try again.'
      }));
      setIsSubmitting(false);
    }
  };

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
                    disabled={isSubmitting}
                  />
                  {isSubmitting && currentStep === 1 && <span className="input-loading">Checking...</span>}
                </div>
                {formErrors.email && <div className="input-error">{formErrors.email}</div>}
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-next"
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                >
                  {isSubmitting && currentStep === 1 ? 'Validating...' : 'Continue'}
                  {!isSubmitting && <span className="btn-icon">→</span>}
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
              <h1 className="form-title">Customize Your Account</h1>
              <p className="form-subtitle">Set up your workspace just the way you like it</p>

              {/* Email already exists error message */}
              {emailAlreadyExists && (
                <div className="email-exists-alert">
                  <div className="alert-content">
                    <div className="alert-header">
                      <div className="alert-icon-container">
                        <span className="alert-icon">✉️</span>
                      </div>
                      <h4 className="alert-title">Email Already Registered</h4>
                    </div>
                    <div className="alert-message">
                      <p>
                        The email <strong>{formData.email}</strong> is already registered. Please use a different email.
                      </p>
                      <div className="update-email-form">
                        <div className="input-wrapper">
                          <span className="input-icon">✉️</span>
                          <input
                            type="email"
                            placeholder="Enter a different email"
                            value={updatedEmail}
                            onChange={handleEmailUpdate}
                            className={formErrors.updatedEmail ? 'error' : ''}
                            disabled={isSubmitting}
                          />
                          {isSubmitting && <span className="input-loading">Checking...</span>}
                        </div>
                        {formErrors.updatedEmail && <div className="input-error">{formErrors.updatedEmail}</div>}
                        <button
                          type="button"
                          className="btn btn-primary update-email-btn"
                          onClick={saveUpdatedEmail}
                          disabled={isSubmitting || !updatedEmail}
                        >
                          {isSubmitting ? 'Checking...' : 'Update Email'} <span className="btn-icon">✨</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="avatar-selection-section">
                <label>Profile Picture</label>
                <div className="avatar-simplified">
                  <div
                    className="avatar-preview-large"
                    style={{ backgroundColor: formData.color }}
                    onClick={handleOpenProfileModal}
                  >
                    {formData.icon}
                    <div className="avatar-edit-overlay">
                      <span className="edit-icon">✏️</span>
                    </div>
                  </div>
                  <div className="avatar-help-text">
                    Click on your profile picture to customize it
                  </div>
                </div>
              </div>

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
                <div className="input-description">
                  Your username will be used for task assignments and mentions
                </div>
                {formErrors.username && <div className="input-error">{formErrors.username}</div>}
              </div>

              <div className="form-group">
                <label>App Preferences</label>
                <div className="preference-grid">
                  <div className="preference-item">
                    <div className="preference-icon">🎨</div>
                    <div className="preference-content">
                      <h4>App Theme</h4>
                      <div className="preference-options">
                        <button
                          type="button"
                          className={`theme-btn light ${formData.theme === 'light' || !formData.theme ? 'active' : ''}`}
                          onClick={() => handleChange({target: {name: 'theme', value: 'light'}})}
                        >
                          Light
                        </button>
                        <button
                          type="button"
                          className={`theme-btn dark ${formData.theme === 'dark' ? 'active' : ''}`}
                          onClick={() => handleChange({target: {name: 'theme', value: 'dark'}})}
                        >
                          Dark
                        </button>
                        <button
                          type="button"
                          className={`theme-btn system ${formData.theme === 'system' ? 'active' : ''}`}
                          onClick={() => handleChange({target: {name: 'theme', value: 'system'}})}
                        >
                          System
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="preference-item">
                    <div className="preference-icon">🔔</div>
                    <div className="preference-content">
                      <h4>Notifications</h4>
                      <div className="notification-options">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            checked={formData.emailNotifications !== false}
                            onChange={handleChange}
                          />
                          <span>Email notifications</span>
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            name="taskReminders"
                            checked={formData.taskReminders !== false}
                            onChange={handleChange}
                          />
                          <span>Task reminders</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="workspace-preview">
                <h3>Workspace Preview</h3>
                <div className="workspace-card">
                  <div className="workspace-sidebar">
                    <div className="workspace-user">
                      <div className="workspace-avatar" style={{ backgroundColor: formData.color }}>
                        {formData.icon}
                      </div>
                      <div className="workspace-user-info">
                        <div className="workspace-name">{`${formData.firstName} ${formData.lastName}`}</div>
                        <div className="workspace-username">@{formData.username || 'username'}</div>
                      </div>
                    </div>
                    <div className="workspace-nav">
                      <div className="workspace-nav-item active">
                        <span className="workspace-nav-icon">📋</span>
                        <span>Tasks</span>
                      </div>
                      <div className="workspace-nav-item">
                        <span className="workspace-nav-icon">📅</span>
                        <span>Calendar</span>
                      </div>
                      <div className="workspace-nav-item">
                        <span className="workspace-nav-icon">📊</span>
                        <span>Analytics</span>
                      </div>
                    </div>
                  </div>
                  <div className="workspace-content">
                    <div className="workspace-header">
                      <h3>Welcome, {formData.firstName || 'User'}</h3>
                      <p>Your personalized workspace is ready</p>
                    </div>
                    <div className="workspace-tasks">
                      <div className="workspace-task">
                        <div className="workspace-task-icon">✓</div>
                        <span>Your first task</span>
                      </div>
                      <div className="workspace-task">
                        <div className="workspace-task-icon">✓</div>
                        <span>Set up your profile</span>
                      </div>
                      <div className="workspace-task">
                        <div className="workspace-task-icon">✓</div>
                        <span>Explore features</span>
                      </div>
                    </div>
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
                  disabled={isSubmitting || emailAlreadyExists}
                >
                  {isSubmitting ? 'Creating Account...' : 'Complete Setup'}
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

      {/* Profile Picture Modal */}
      <ProfilePictureModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        initialValue={{
          icon: formData.icon,
          color: formData.color,
          initial: formData.firstName ? formData.firstName[0].toUpperCase() : 'T',
          customImage: formData.customImage
        }}
        colors={colors}
        profileIcons={profileIcons}
        onSave={handleSaveProfileSettings}
      />
    </div>
  );
};

export default RegisterPage;
