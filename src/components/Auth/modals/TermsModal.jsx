import React from 'react';
import './styles/LegalModals.css';

const TermsModal = ({ isOpen, onClose }) => {
  const lastUpdated = "October 15, 2023";

  if (!isOpen) return null;

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="legal-modal-overlay" onClick={handleBackdropClick}>
      <div className="legal-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h2>Terms of Service</h2>
          <button className="legal-modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        
        <div className="legal-modal-content">
          <p className="legal-updated">Last Updated: {lastUpdated}</p>

          <div className="legal-section">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using Tasklio ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </div>

          <div className="legal-section">
            <h3>2. Description of Service</h3>
            <p>Tasklio is a task management application that helps you organize your personal and professional tasks. The Service is provided "as is" and on an "as available" basis without any representation or endorsement made and without warranty of any kind.</p>
          </div>

          <div className="legal-section">
            <h3>3. User Accounts</h3>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for maintaining the security of your account.</p>
            <p>You are fully responsible for all activities that occur under your account and any other actions taken in connection with the account.</p>
          </div>

          <div className="legal-section">
            <h3>4. Acceptable Use</h3>
            <p>You may use our Service for lawful purposes only. You agree not to use the Service:</p>
            <ul>
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
              <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
              <li>For any purpose that is unlawful or prohibited by these Terms</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3>5. Content and Intellectual Property</h3>
            <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material ("Content"). You are responsible for the Content that you post to the Service.</p>
            <p>By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.</p>
          </div>

          <div className="legal-section">
            <h3>6. Privacy Policy</h3>
            <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your personal information.</p>
          </div>

          <div className="legal-section">
            <h3>7. Prohibited Uses</h3>
            <p>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:</p>
            <ul>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3>8. Termination</h3>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            <p>Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.</p>
          </div>

          <div className="legal-section">
            <h3>9. Disclaimer</h3>
            <p>The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:</p>
            <ul>
              <li>Excludes all representations and warranties relating to this website and its contents</li>
              <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3>10. Limitation of Liability</h3>
            <p>In no event shall Tasklio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.</p>
          </div>

          <div className="legal-section">
            <h3>11. Governing Law</h3>
            <p>These Terms shall be interpreted and governed by the laws of the jurisdiction in which the Company is located, without regard to conflict of law provisions.</p>
          </div>

          <div className="legal-section">
            <h3>12. Changes to Terms</h3>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
            <p>What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
          </div>

          <div className="legal-section">
            <h3>13. Contact Information</h3>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p><strong>Email:</strong> legal@tasklio.com</p>
            <p><strong>Address:</strong> Tasklio Legal Department</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
