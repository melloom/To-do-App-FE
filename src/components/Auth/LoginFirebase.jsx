import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
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

  useEffect(() => {
    setAnimateIn(true);
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

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <Link to="/" className="back-home-btn">
            <span className="back-icon">←</span>
            <span>Back to Home</span>
          </Link>

          <div className="brand-section">
            <div className="brand-logo">
              <img src="/favicon.ico" alt="Tasklio" className="logo-favicon" />
              <div className="logo-icon">T</div>
              <span className="logo-text">Tasklio</span>
            </div>
            <p className="brand-tagline">Welcome back to your productivity hub</p>
          </div>
        </div>

        {/* Main Content */}
        <div className={`login-content ${animateIn ? 'animate-in' : ''}`}>
          <div className="login-card">
            <div className="card-header">
              <div className="welcome-icon">👋</div>
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">
                Sign in to continue managing your tasks and boost your productivity
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-banner">
                <div className="error-icon">⚠️</div>
                <span className="error-text">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span className="label-icon">📧</span>
                  Email Address
                </label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`form-input ${formData.email ? 'has-value' : ''}`}
                    disabled={isLoading}
                  />
                  {formData.email && (
                    <div className="input-check">✓</div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <span className="label-icon">🔒</span>
                  Password
                </label>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`form-input ${formData.password ? 'has-value' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="form-options">
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="login-btn"
                disabled={isLoading || !formData.email || !formData.password}
              >
                <div className="btn-content">
                  {isLoading ? (
                    <>
                      <div className="btn-spinner"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </div>
              </button>

              {/* Divider */}
              <div className="divider">
                <span className="divider-text">or continue with</span>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="google-btn"
                disabled={isLoading}
              >
                <div className="google-btn-content">
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    className="google-icon"
                  />
                  <span>Continue with Google</span>
                </div>
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="signup-section">
              <p className="signup-text">
                Don't have an account?{' '}
                <Link to="/register" className="signup-link">
                  Create one here
                </Link>
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="features-preview">
            <div className="preview-header">
              <h3>Why choose Tasklio?</h3>
            </div>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <div className="feature-content">
                  <h4>Boost Productivity</h4>
                  <p>Organize tasks efficiently</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <div className="feature-content">
                  <h4>Private & Secure</h4>
                  <p>Your data stays protected</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h4>Lightning Fast</h4>
                  <p>Quick and responsive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFirebase;