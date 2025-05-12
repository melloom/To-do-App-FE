import React, { useState, useEffect } from 'react';
import { useUser } from '../../../contexts/UserContext';
import TermsOfServiceModal from '../../common/TermsOfServiceModal';
import { collection, addDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import './styles/UserRegistration.css';

const UserRegistration = () => {
  const { setUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formIsDirty, setFormIsDirty] = useState(false);

  const db = getFirestore();

  useEffect(() => {
    if (name.trim() || email.trim()) {
      setFormIsDirty(true);
    }
  }, [name, email]);

  useEffect(() => {
    if (formIsDirty) {
      const handleBeforeUnload = (e) => {
        const confirmationMessage = 'You have unsaved registration information. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [formIsDirty]);

  const handleChange = (e, setter) => {
    setter(e.target.value);
    setFormIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setError('You must accept the Terms of Service to continue');
      return;
    }

    if (!name.trim() || !email.trim()) {
      setError('Name and email are required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create user in Firebase
      const userDocRef = await addDoc(collection(db, "users"), {
        name,
        email,
        acceptedTerms,
        createdAt: new Date().toISOString()
      });

      // Save user locally
      const userData = {
        id: userDocRef.id,
        name,
        email,
        acceptedTerms,
        createdAt: new Date().toISOString()
      };

      // Store in local storage for persistence
      localStorage.setItem('tasklio_user', JSON.stringify(userData));

      // Update user context
      setUser(userData);

    } catch (error) {
      console.error("Error adding user to Firebase:", error);
      setError('Failed to create user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openTermsModal = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  return (
    <div className="user-registration">
      <div className="registration-container">
        <h2>Welcome to Tasklio</h2>
        <p className="welcome-text">Let's set up your account before you start managing your tasks</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleChange(e, setName)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group terms-checkbox">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              I accept the <a href="#" onClick={openTermsModal}>Terms of Service</a>
            </label>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>
      </div>

      <TermsOfServiceModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </div>
  );
};

export default UserRegistration;