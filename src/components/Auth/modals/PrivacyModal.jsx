import React from 'react';
import './styles/LegalModals.css';

const PrivacyModal = ({ isOpen, onClose }) => {
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
          <h2>Privacy Policy</h2>
          <button className="legal-modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        
        <div className="legal-modal-content">
          <p className="legal-updated">Last Updated: {lastUpdated}</p>

          <div className="legal-section">
            <h3>1. Introduction</h3>
            <p>At Tasklio, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our task management application ("Service").</p>
            <p>We encourage you to read this Privacy Policy carefully to understand our policies and practices regarding your information.</p>
          </div>

          <div className="legal-section">
            <h3>2. Information We Collect</h3>
            <h4>Personal Information</h4>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Register for the Service</li>
              <li>Create tasks and content</li>
              <li>Contact us for support</li>
              <li>Subscribe to newsletters or promotional materials</li>
              <li>Participate in surveys or promotional activities</li>
            </ul>
            
            <h4>Automatically Collected Information</h4>
            <p>We automatically collect certain information when you use the Service, including:</p>
            <ul>
              <li>Device information (device type, operating system, browser type)</li>
              <li>Log information (IP address, access times, pages visited)</li>
              <li>Usage patterns and preferences</li>
              <li>Location information (if you enable location services)</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3>3. How We Use Your Information</h3>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve the Service</li>
              <li>Process and complete transactions</li>
              <li>Send administrative information and updates</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
              <li>Personalize and improve your experience</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3>4. Information Sharing and Disclosure</h3>
            <p>We may share your information in the following situations:</p>
            <ul>
              <li><strong>With Service Providers:</strong> We may share your information with third-party vendors and service providers</li>
              <li><strong>For Business Transfers:</strong> We may share or transfer your information in connection with any merger, sale, or acquisition</li>
              <li><strong>With Affiliates:</strong> We may share your information with our affiliates and subsidiaries</li>
              <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3>5. Data Security</h3>
            <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure.</p>
            <p>We use administrative, technical, and physical security measures to help protect your personal information, but we cannot guarantee absolute security.</p>
          </div>

          <div className="legal-section">
            <h3>6. Data Retention</h3>
            <p>We will retain your information for as long as your account is active or as needed to provide you with the Service. We will also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
          </div>

          <div className="legal-section">
            <h3>7. Your Privacy Rights</h3>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li><strong>Access:</strong> The right to request copies of your personal information</li>
              <li><strong>Rectification:</strong> The right to request correction of inaccurate or incomplete information</li>
              <li><strong>Erasure:</strong> The right to request deletion of your personal information</li>
              <li><strong>Restriction:</strong> The right to request restriction of processing of your information</li>
              <li><strong>Data Portability:</strong> The right to request transfer of your information to another organization</li>
              <li><strong>Objection:</strong> The right to object to our processing of your personal information</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3>8. Cookies and Tracking Technologies</h3>
            <p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.</p>
            <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
          </div>

          <div className="legal-section">
            <h3>9. Third-Party Services</h3>
            <p>The Service may contain links to third-party websites and services that are not owned or controlled by us. We are not responsible for the privacy practices of these third parties.</p>
            <p>We strongly advise you to review the privacy policy of every site you visit and service you use.</p>
          </div>

          <div className="legal-section">
            <h3>10. Children's Privacy</h3>
            <p>The Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</p>
          </div>

          <div className="legal-section">
            <h3>11. International Data Transfers</h3>
            <p>Your information, including personal data, may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ.</p>
          </div>

          <div className="legal-section">
            <h3>12. Changes to This Privacy Policy</h3>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          </div>

          <div className="legal-section">
            <h3>13. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <p><strong>Email:</strong> privacy@tasklio.com</p>
            <p><strong>Address:</strong> Tasklio Privacy Team</p>
            <p><strong>Phone:</strong> Available upon request</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
