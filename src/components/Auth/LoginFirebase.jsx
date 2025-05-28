import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import './styles/LoginFirebase.css';

const LoginFirebase = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setAnimateIn(true);
    if (formRef.current) {
      formRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
    
    // Alternative scroll method for better browser support
    setTimeout(() => {
      const loginContainer = document.querySelector('.login-container');
      if (loginContainer) {
        loginContainer.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/app');
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        default:
          setError('Login failed. Please check your credentials and try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/app');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('Google sign-in failed. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/app');
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      setError('GitHub sign-in failed. Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="login-container" ref={formRef}>
          <div className="login-header">
            <Link to="/" className="back-to-home">
              <span className="back-icon">←</span>
              Back to Home
            </Link>
            
            <div className="auth-logo">
              <div className="logo-bubble">T</div>
              <h1>Welcome Back</h1>
            </div>
            <p className="auth-subtitle">Sign in to continue to Tasklio</p>
          </div>

          <div className="login-form-wrapper">
            {error && (
              <div className="auth-error">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">
                  <span className="input-icon">📧</span>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="enhanced-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <span className="input-icon">🔒</span>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="enhanced-input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="login-button"
                >
                  {isLoading ? (
                    <div className="btn-loading-spinner"></div>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot your password?
                </Link>
              </div>
            </form>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="oauth-buttons">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="oauth-btn google-btn"
              >
                <div className="oauth-btn-content">
                  {isLoading ? (
                    <div className="btn-loading-spinner"></div>
                  ) : (
                    <>
                      <span className="oauth-icon">G</span>
                      Continue with Google
                    </>
                  )}
                </div>
              </button>

              <button
                onClick={handleGithubSignIn}
                disabled={isLoading}
                className="oauth-btn github-btn"
              >
                <div className="oauth-btn-content">
                  {isLoading ? (
                    <div className="btn-loading-spinner"></div>
                  ) : (
                    <>
                      <span className="oauth-icon">GH</span>
                      Continue with GitHub
                    </>
                  )}
                </div>
              </button>
            </div>

            <div className="signup-link-container">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="signup-link">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFirebase;