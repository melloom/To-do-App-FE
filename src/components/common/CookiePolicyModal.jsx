import React from 'react';
import './TermsOfServiceModal.css'; // Reusing the same CSS as the ToS modal

const CookiePolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="tos-modal-overlay">
      <div className="tos-modal-container">
        <div className="tos-modal-header">
          <h2>Cookie Policy</h2>
          <button className="tos-close-button" onClick={onClose}>×</button>
        </div>
        <div className="tos-modal-content">
          <div className="tos-section">
            <h3>1. Introduction</h3>
            <p>This Cookie Policy explains how Tasklio ("we", "us", or "our") uses cookies and similar technologies on our website and application. This Policy should be read alongside our Privacy Policy which explains how we use your personal information.</p>
            <p>By continuing to use our Service, you are agreeing to our use of cookies as described in this Cookie Policy.</p>
          </div>

          <div className="tos-section">
            <h3>2. What are Cookies?</h3>
            <p>Cookies are small text files that are placed on your computer, smartphone, or other device when you access the internet, which enable users to navigate around the site and allow us to tailor content and remember your preferences.</p>
            <p>Some cookies are essential for the operation of our website while others are used to improve your experience and help make our website more efficient.</p>
          </div>

          <div className="tos-section">
            <h3>3. How We Use Cookies</h3>
            <p>We use cookies in several ways to improve your experience on our site:</p>
            <ul className="tos-list">
              <li><strong>Essential cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access.</li>
              <li><strong>Functionality cookies:</strong> These cookies allow us to remember choices you make and provide enhanced features.</li>
              <li><strong>Analytics cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
              <li><strong>Preference cookies:</strong> These cookies allow a website to remember information that changes the way the website behaves or looks, like your preferred language or the region you are in.</li>
            </ul>
          </div>

          <div className="tos-section">
            <h3>4. Data Storage</h3>
            <p>At Tasklio, we prioritize security and reliability by storing all your data on our secure cloud servers. This approach allows us to:</p>
            <ul className="tos-list">
              <li>Ensure your data is backed up and protected with enterprise-grade security</li>
              <li>Provide seamless synchronization across all your devices</li>
              <li>Maintain data integrity and prevent data loss</li>
              <li>Offer real-time collaboration features and updates</li>
              <li>Enable advanced features like smart reminders and analytics</li>
            </ul>
            <p>Your tasks, preferences, and account information are securely stored in our SOC 2 compliant cloud infrastructure, protected by industry-standard encryption and security measures. Unlike local storage solutions, our cloud-based approach ensures your data is always accessible, backed up, and synchronized across all your devices.</p>
          </div>

          <div className="tos-section">
            <h3>5. Your Cookie Choices</h3>
            <p>You can manage your cookie preferences in several ways:</p>
            <ul className="tos-list">
              <li><strong>Browser settings:</strong> Most web browsers allow some control of cookies through your browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.</li>
              <li><strong>In-app settings:</strong> You can also adjust your privacy preferences within our application settings.</li>
              <li><strong>Clear local storage:</strong> You can clear local storage through your browser's settings or by clearing site data.</li>
            </ul>
            <p>Please note that restricting cookies may impact the functionality of our website and service.</p>
          </div>

          <div className="tos-section">
            <h3>6. Third-Party Cookies</h3>
            <p>Some cookies are placed by third parties on our website. These third parties may include analytics providers, social media platforms, and advertising networks. We do not control the use of such cookies.</p>
            <p>Each third party uses its own cookies and has its own privacy policy. We encourage you to read the privacy policies of these third parties to understand how they use cookies and how they process your information.</p>
          </div>

          <div className="tos-section">
            <h3>7. Data Privacy in Tasklio</h3>
            <p>At Tasklio, we prioritize your privacy. That's why:</p>
            <ul className="tos-list">
              <li>We primarily use local storage instead of server-side storage when possible</li>
              <li>We minimize our use of analytics cookies to only what's necessary</li>
              <li>We do not use advertising cookies</li>
              <li>We provide transparent information about our data practices</li>
            </ul>
            <p>For complete information about how we process your data, please refer to our <a href="#" onClick={(e) => {e.preventDefault(); window.openPrivacyModal && window.openPrivacyModal();}}>Privacy Policy</a>.</p>
          </div>

          <div className="tos-section">
            <h3>8. Updates to This Cookie Policy</h3>
            <p>We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated revision date.</p>
            <p>We encourage you to periodically review this page to stay informed about our use of cookies.</p>
          </div>

          <div className="tos-section">
            <h3>9. Contact Us</h3>
            <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us at:</p>
            <p>Email: privacy@tasklio.com</p>
            <p>Last Updated: May 11, 2023</p>
          </div>
        </div>
        <div className="tos-modal-footer">
          <button className="tos-accept-button" onClick={onClose}>I Understand</button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyModal;
