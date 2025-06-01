import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// Component to prevent auto-navigation during registration
const RegistrationGuard = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Set registration flag when on registration pages
    const isOnRegistrationPage = location.pathname.includes('/register') || 
                                location.pathname.includes('/registration') ||
                                location.pathname.includes('/step');
    
    if (isOnRegistrationPage) {
      sessionStorage.setItem('registrationInProgress', 'true');
      // Add consent parameter for OAuth during registration
      sessionStorage.setItem('oauthPrompt', 'consent');
      console.log('Registration guard active - preventing auto-navigation');
    }
    
    return () => {
      // Only clear if we're navigating away from registration
      if (!location.pathname.includes('/register') && 
          !location.pathname.includes('/registration') &&
          !location.pathname.includes('/step')) {
        sessionStorage.removeItem('registrationInProgress');
        sessionStorage.removeItem('oauthRegistrationInProgress');
        sessionStorage.removeItem('oauthPrompt');
      }
    };
  }, [location.pathname]);
  
  // Prevent navigation if user completes auth but is still in registration
  useEffect(() => {
    if (user && user.registrationComplete && 
        !location.pathname.includes('/register') &&
        !location.pathname.includes('/registration') &&
        !location.pathname.includes('/step')) {
      console.log('User registration complete, allowing navigation to dashboard');
      navigate('/dashboard');
    }
  }, [user, location.pathname, navigate]);
  
  return children;
};

export default RegistrationGuard;