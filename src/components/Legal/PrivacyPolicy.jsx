import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Legal.css';

const PrivacyPolicy = () => {
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
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last Updated: {lastUpdated}</p>

        <div className="legal-content">
          <div className="legal-section">
            <h2>1. Introduction</h2>
            <p>At Tasklio ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").</p>
            <p>Please read this Privacy Policy carefully. By using the Service, you consent to the practices described in this policy.</p>
          </div>

          <div className="legal-section">
            <h2>2. Information We Collect</h2>

            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you register for the Service, express interest in obtaining information about us or our products, or otherwise contact us. This information may include:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>User credentials (username, password)</li>
              <li>Profile information (profile picture, biographical information)</li>
              <li>Preferences and settings</li>
            </ul>

            <h3>2.2 Information from Third-Party Login Services</h3>
            <p>If you choose to register or log in to our Service using a third-party account (such as Google), we may collect information from that service, including your name, email address, and profile picture, in accordance with the authorization procedures determined by that service.</p>

            <h3>2.3 Usage Data</h3>
            <p>We automatically collect certain information when you use the Service, including:</p>
            <ul>
              <li>Device information (device type, operating system)</li>
              <li>Log information (IP address, browser type, pages visited)</li>
              <li>Usage patterns and preferences</li>
              <li>Performance and error data</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve the Service</li>
              <li>Process and complete transactions</li>
              <li>Send administrative information, such as updates or changes to our terms, conditions, and policies</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you technical notices, security alerts, and support messages</li>
              <li>Monitor and analyze trends, usage, and activities in connection with the Service</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Protect against harm to the rights, property, or safety of Tasklio, our users, or the public</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>4. How We Share Your Information</h2>
            <p>We may share your information in the following situations:</p>
            <ul>
              <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us.</li>
              <li><strong>For Business Transfers:</strong> We may share your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
              <li><strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent.</li>
              <li><strong>For Legal Compliance:</strong> We may disclose your information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information, or to otherwise protect our rights.</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </div>

          <div className="legal-section">
            <h2>6. Data Retention</h2>
            <p>We will retain your information for as long as your account is active or as needed to provide you with the Service. We will also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
          </div>

          <div className="legal-section">
            <h2>7. Your Rights and Choices</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>The right to access the personal information we hold about you</li>
              <li>The right to request that we correct or update your personal information</li>
              <li>The right to request that we delete your personal information</li>
              <li>The right to object to the processing of your personal information</li>
              <li>The right to request a copy of your personal information in a structured, commonly used, and machine-readable format</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section.</p>
          </div>

          <div className="legal-section">
            <h2>8. Third-Party Services</h2>
            <p>The Service may contain links to third-party websites and services. We are not responsible for the content or privacy practices of these third parties. We encourage you to review the privacy policies of these third parties before providing any information to them.</p>
          </div>

          <div className="legal-section">
            <h2>9. Children's Privacy</h2>
            <p>The Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.</p>
          </div>

          <div className="legal-section">
            <h2>10. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.</p>
            <p>We encourage you to review this Privacy Policy periodically for any changes.</p>
          </div>

          <div className="legal-section">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>Email: privacy@tasklio.com</p>
          </div>
        </div>

        <div className="legal-footer">
          <Link to="/terms" className="legal-link">Terms of Service</Link>
          <span className="legal-divider">•</span>
          <Link to="/" className="legal-link">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
