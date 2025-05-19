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
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  closeOnOutsideClick = true,
  className = ''
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
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

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
        className={`modal-container ${size} ${className}`}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
