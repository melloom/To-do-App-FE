import React, { useState } from 'react';
import { useUser } from '../../../contexts/UserContext';
import './styles/UserRegistration.css';

const UserRegistration = () => {
  const { registerUser, setShowRegistration } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    color: '#5b5ef4'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = [
    '#5b5ef4', '#38bdf8', '#f59e0b',
    '#10b981', '#ef4444', '#8b5cf6',
    '#ec4899', '#6b7280'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      color
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      registerUser(formData);
      setIsSubmitting(false);
      // Registration success is handled in UserContext
    }, 1000);
  };

  const handleBack = () => {
    setShowRegistration(false);
  };

  const userInitial = formData.name ? formData.name[0].toUpperCase() : '?';

  return (
    <div className="registration-overlay">
      <div className="registration-header">
        <div className="reg-logo-container">
          <div className="reg-logo-bubble">T</div>
          <h1>Tasklio</h1>
        </div>
        <div className="reg-header-actions">
          <button className="back-to-home-btn" onClick={handleBack}>
            Back to Home
          </button>
        </div>
      </div>

      <div className="registration-container">
        <h2>Create Your Profile</h2>
        <p>Set up your personalized Tasklio experience</p>

        <form onSubmit={handleSubmit}>
          <div className="avatar-preview">
            <div
              className="avatar"
              style={{ backgroundColor: formData.color }}
            >
              {userInitial}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="registration-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <div className="registration-error">{formErrors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="registration-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <div className="registration-error">{formErrors.email}</div>}
          </div>

          <div className="form-group">
            <label>Choose Your Color</label>
            <div className="color-grid">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-option ${formData.color === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                >
                  {formData.color === color && <span className="color-check">✓</span>}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`registration-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;