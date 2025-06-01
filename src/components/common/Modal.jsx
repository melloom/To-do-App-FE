import React, { useEffect, useRef } from 'react';
import './Modal.css';

/**
 * Reusable Modal Component
 *
 * @param {Object} props Component props
 * @param {boolean} props.isOpen Whether the modal is open
 * @param {Function} props.onClose Function to call when modal is closed
 * @param {string} props.title Modal title
 * @param {React.ReactNode} props.children Modal content
 * @param {string} props.size Modal size ('small', 'medium', 'large', 'full')
 * @param {boolean} props.closeOnOutsideClick Whether to close modal when clicking outside
 * @param {string} props.className Additional class names for the modal
 * @param {boolean} props.oauthConsent Whether this modal requires OAuth consent
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  closeOnOutsideClick = true,
  className = '',
  oauthConsent = false
}) => {
  const modalRef = useRef(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Add consent parameter to body for OAuth flows
      if (oauthConsent) {
        document.body.setAttribute('data-oauth-prompt', 'consent');
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
      document.body.removeAttribute('data-oauth-prompt');
    };
  }, [isOpen, onClose, oauthConsent]);

  // Handle outside click
  const handleOverlayClick = (e) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`modal-container ${size} ${className} ${oauthConsent ? 'oauth-consent' : ''}`}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        data-oauth-prompt={oauthConsent ? 'consent' : undefined}
      >
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          {oauthConsent && (
            <div className="oauth-consent-notice">
              <span className="icon">🔐</span>
              <span>This action requires additional permissions and will show a consent screen.</span>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
