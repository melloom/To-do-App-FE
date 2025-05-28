import React, { useState } from 'react';
import './SignOut.css';

const SignOut = ({ onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    try {
      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      localStorage.removeItem('theme');
      localStorage.removeItem('preferences');
      
      // Clear session storage
      sessionStorage.clear();
      
      // TODO: Call logout API
      // await authService.logout();
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login page
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleAccountDeletion = () => {
    // TODO: Implement account deletion flow
    alert('Account deletion feature will be implemented soon.');
  };

  return (
    <div className="sign-out">
      <div className="account-section">
        <h3>🔐 Account Actions</h3>
        
        <div className="action-group">
          <div className="action-item">
            <div className="action-info">
              <h4>Sign Out</h4>
              <p>Sign out of your account on this device</p>
            </div>
            <button 
              className="sign-out-btn"
              onClick={() => setShowConfirmation(true)}
              disabled={isSigningOut}
            >
              {isSigningOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>

          <div className="action-item danger">
            <div className="action-info">
              <h4>Delete Account</h4>
              <p>Permanently delete your account and all data</p>
            </div>
            <button 
              className="delete-account-btn"
              onClick={handleAccountDeletion}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <div className="security-section">
        <h3>🔒 Security</h3>
        
        <div className="security-info">
          <div className="security-item">
            <span className="security-label">Last Login:</span>
            <span className="security-value">Today at 2:30 PM</span>
          </div>
          <div className="security-item">
            <span className="security-label">Device:</span>
            <span className="security-value">Chrome on Windows</span>
          </div>
          <div className="security-item">
            <span className="security-label">IP Address:</span>
            <span className="security-value">192.168.1.1</span>
          </div>
        </div>

        <div className="security-actions">
          <button className="security-action-btn">
            <span className="btn-icon">🔑</span>
            Change Password
          </button>
          <button className="security-action-btn">
            <span className="btn-icon">📱</span>
            Manage Devices
          </button>
          <button className="security-action-btn">
            <span className="btn-icon">🛡️</span>
            Two-Factor Auth
          </button>
        </div>
      </div>

      <div className="data-section">
        <h3>📦 Data Management</h3>
        
        <div className="data-actions">
          <button className="data-action-btn">
            <span className="btn-icon">📥</span>
            Export Data
          </button>
          <button className="data-action-btn">
            <span className="btn-icon">🗑️</span>
            Clear Cache
          </button>
          <button className="data-action-btn">
            <span className="btn-icon">🔄</span>
            Reset Settings
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <h3>Confirm Sign Out</h3>
            <p>Are you sure you want to sign out? You'll need to sign in again to access your account.</p>
            
            <div className="confirmation-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowConfirmation(false)}
                disabled={isSigningOut}
              >
                Cancel
              </button>
              <button 
                className="confirm-sign-out-btn"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                {isSigningOut ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing Out...
                  </>
                ) : (
                  'Sign Out'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignOut;