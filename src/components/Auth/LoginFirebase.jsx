import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './styles/LoginFirebase.css';

const LoginFirebase = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Add animation effect when component mounts
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    return errors;
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const auth = getAuth();
      // Normalize email for consistent handling
      const normalizedEmail = formData.email.trim().toLowerCase();
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        normalizedEmail, 
        formData.password
      );
      
      // If remember me is checked, store in localStorage
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', normalizedEmail);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Navigate to app dashboard on successful login
      navigate('/app');
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setFormErrors({ 
          auth: 'Invalid email or password. Please try again.' 
        });
      } else if (error.code === 'auth/too-many-requests') {
        setFormErrors({ 
          auth: 'Too many unsuccessful login attempts. Please try again later or reset your password.' 
        });
      } else {
        setFormErrors({ auth: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check for remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ 
        ...prev, 
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="auth-header">
          <Link to="/" className="back-to-home">
            <span className="back-icon">←</span>
            <span>Back to Home</span>
          </Link>
          <div className="brand-logo">
            <div className="logo-icon">T</div>
            <div className="logo-text">Tasklio</div>
          </div>
        </div>
        
        <div className="auth-content">
          <div className={`login-content ${animateIn ? 'animate-in' : ''}`}>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue to your dashboard</p>
            
            {formErrors.auth && (
              <div className="auth-error-banner">
                <span className="error-icon">!</span>
                <span>{formErrors.auth}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-container">
                  <span className="input-icon">✉️</span>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={`auth-input ${formErrors.email ? 'error' : ''}`} 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email" 
                  />
                </div>
                {formErrors.email && <div className="auth-error">{formErrors.email}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <span className="input-icon">🔒</span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    name="password" 
                    className={`auth-input ${formErrors.password ? 'error' : ''}`} 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Enter your password" 
                  />
                  <button 
                    type="button" 
                    className="password-toggle" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formErrors.password && <div className="auth-error">{formErrors.password}</div>}
              </div>
              
              <div className="login-options">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    name="rememberMe" 
                    checked={formData.rememberMe}
                    onChange={handleChange} 
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
              </div>
              
              <button 
                type="submit" 
                className={`auth-button login-button ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <div className="social-login">
              <p className="divider"><span>Or sign in with</span></p>
              <div className="social-buttons">
                <button className="social-button google">
                  <span className="social-icon">G</span>
                  Google
                </button>
                <button className="social-button github">
                  <span className="social-icon">GH</span>
                  GitHub
                </button>
              </div>
            </div>
            
            <div className="auth-footer">
              <p>
                Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="login-mockup-container">
        <div className="login-mockup">
          <div className="mockup-header">
            <div className="mockup-logo">Tasklio</div>
            <div className="mockup-actions">
              <div className="mockup-user">User</div>
            </div>
          </div>
          <div className="mockup-content">
            <div className="mockup-sidebar">
              <div className="mockup-menu-item active"></div>
              <div className="mockup-menu-item"></div>
              <div className="mockup-menu-item"></div>
              <div className="mockup-menu-item"></div>
            </div>
            <div className="mockup-main">
              <div className="mockup-card"></div>
              <div className="mockup-card"></div>
              <div className="mockup-card small"></div>
              <div className="mockup-card small"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFirebase;