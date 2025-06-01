import React from 'react';
import './ConfirmationModal.css';

/**
 * A reusable confirmation modal component that can be used for "Are you sure?" type confirmations
 *
 * @param {Object} props Component props
 * @param {boolean} props.isOpen Whether the modal is open
 * @param {Function} props.onClose Function to call when the modal is closed without confirmation
 * @param {Function} props.onConfirm Function to call when the user confirms the action
 * @param {string} props.title The title of the confirmation modal
 * @param {string|React.ReactNode} props.message The message to display in the modal
 * @param {string} props.confirmText The text for the confirm button (default: "Confirm")
 * @param {string} props.cancelText The text for the cancel button (default: "Cancel")
 * @param {string} props.confirmButtonClass Additional class for confirm button (default: "confirm-danger")
 * @param {React.ReactNode} props.icon Custom icon to display in the modal
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonClass = "confirm-danger",
  icon = null
}) => {
  if (!isOpen) return null;

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="confirmation-modal-overlay" 
      onClick={onClose}
      style={{ zIndex: 9999 }} // Inline style to ensure highest priority
    >
      <div 
        className="confirmation-modal-container" 
        onClick={handleModalClick}
        style={{ zIndex: 10000 }} // Even higher z-index for the container
      >
        <div className="confirmation-modal-content">
          {icon && <div className="confirmation-modal-icon">{icon}</div>}

          <h2 className="confirmation-modal-title">{title}</h2>

          <div className="confirmation-modal-message">
            {typeof message === 'string' ? <p>{message}</p> : message}
          </div>

          <div className="confirmation-modal-actions">
            <button
              className="confirmation-modal-button cancel-button"
              onClick={onClose}
              style={{ zIndex: 10001 }} // Highest z-index for buttons
            >
              {cancelText}
            </button>

            <button
              className={`confirmation-modal-button confirm-button ${confirmButtonClass}`}
              onClick={onConfirm}
              style={{ zIndex: 10001 }} // Highest z-index for buttons
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
