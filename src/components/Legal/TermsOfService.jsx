import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Legal.css';

const TermsOfService = () => {
  const lastUpdated = "October 15, 2023";

  return (
    <div className="legal-page">
      <div className="legal-header">
        <div className="back-to-home">
          <Link to="/" className="back-button">
            <span className="back-icon">←</span>
            <span>Back to Home</span>
          </Link>
        </div>
        <div className="legal-logo">
          <img src="/favicon-32x32.png" alt="Tasklio Logo" className="legal-logo-favicon" />
          <h2>Tasklio</h2>
        </div>
      </div>

      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last Updated: {lastUpdated}</p>

        <div className="legal-content">
          <div className="legal-section">
            <h2>1. Introduction</h2>
            <p>Welcome to Tasklio ("Service"). By accessing or using our Service, you agree to be bound by these Terms of Service ("Terms"), our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the Service.</p>
            <p>We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting. Your continued use of the Service following any modifications indicates your acceptance of the modified Terms.</p>
          </div>

          <div className="legal-section">
            <h2>2. Account Registration</h2>
            <p>To use certain features of the Service, you must register for an account. When you register, you agree to provide accurate, current, and complete information and to update this information to maintain its accuracy.</p>
            <p>You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            <p>We reserve the right to disable any user account if, in our opinion, you have violated any provision of these Terms.</p>
          </div>

          <div className="legal-section">
            <h2>3. User Content</h2>
            <p>Our Service allows you to create, store, and share content, including tasks, notes, and other information ("User Content").</p>
            <p>You retain all rights to your User Content. By submitting User Content to the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and display such content solely for the purpose of providing and improving the Service.</p>
            <p>You represent and warrant that you own or have the necessary rights to your User Content and that it does not violate the rights of any third party.</p>
          </div>

          <div className="legal-section">
            <h2>4. Acceptable Use</h2>
            <p>You agree not to use the Service:</p>
            <ul>
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit any material that is defamatory, offensive, or otherwise objectionable</li>
              <li>To impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
              <li>To engage in any activity that interferes with or disrupts the Service</li>
              <li>To attempt to access any part of the Service or any server or network connected to the Service by hacking or other unauthorized means</li>
              <li>To collect or harvest any information from the Service without our written consent</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Intellectual Property</h2>
            <p>The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of Tasklio and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
            <p>Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.</p>
          </div>

          <div className="legal-section">
            <h2>6. Termination</h2>
            <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including but not limited to a breach of the Terms.</p>
            <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or request account deletion through the settings.</p>
          </div>

          <div className="legal-section">
            <h2>7. Limitation of Liability</h2>
            <p>In no event shall Tasklio, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or goodwill, resulting from your access to or use of or inability to access or use the Service.</p>
          </div>

          <div className="legal-section">
            <h2>8. Changes to Terms</h2>
            <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.</p>
          </div>

          <div className="legal-section">
            <h2>9. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
          </div>

          <div className="legal-section">
            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at support@tasklio.com.</p>
          </div>
        </div>

        <div className="legal-footer">
          <Link to="/privacy" className="legal-link">Privacy Policy</Link>
          <span className="legal-divider">•</span>
          <Link to="/" className="legal-link">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
