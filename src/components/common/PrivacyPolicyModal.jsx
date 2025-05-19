import React from 'react';
import './TermsOfServiceModal.css'; // Reusing the same CSS as the ToS modal

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="tos-modal-overlay">
      <div className="tos-modal-container">
        <div className="tos-modal-header">
          <h2>Privacy Policy</h2>
          <button className="tos-close-button" onClick={onClose}>×</button>
        </div>
        <div className="tos-modal-content">
          <div className="tos-section">
            <h3>1. Introduction</h3>
            <p>At Tasklio ("we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our task management application ("Service").</p>
            <p>We encourage you to read this Privacy Policy carefully to understand our policies and practices regarding your information. By accessing or using our Service, you agree to this Privacy Policy.</p>
          </div>

          <div className="tos-section">
            <h3>2. Information We Collect</h3>
            <p>We collect several types of information from and about users of our Service:</p>

            <h4>2.1 Personal Identification Information</h4>
            <p>We may collect personal identification information from users in various ways, including, but not limited to, when users register on our Service, and in connection with other activities, services, features, or resources we make available. Users may be asked for, as appropriate:</p>
            <ul className="tos-list">
              <li>Name</li>
              <li>Email address</li>
              <li>Username</li>
              <li>Profile information</li>
            </ul>

            <h4>2.2 Task and Usage Data</h4>
            <p>When you use our Service, we may collect information about your tasks, including titles, descriptions, due dates, categories, and completion status. This information is primarily stored locally on your device.</p>

            <h4>2.3 Device and Technical Information</h4>
            <p>We may collect information about your device and internet connection, including the device's unique device identifier, IP address, operating system, browser type, mobile network information, and the device's telephone number.</p>

            <h4>2.4 Usage Details</h4>
            <p>We may collect information about how you use our Service, including:</p>
            <ul className="tos-list">
              <li>Traffic data</li>
              <li>Logs and other communication data</li>
              <li>Resources that you access and use on the Service</li>
              <li>Information about your computer and internet connection</li>
            </ul>
          </div>

          <div className="tos-section">
            <h3>3. How We Collect Your Information</h3>
            <p>We use different methods to collect information from and about you, including through:</p>

            <h4>3.1 Direct Interactions</h4>
            <p>Information you provide when you register, create or modify your account, set up a profile, set preferences, sign-up for or make purchases through the Service.</p>

            <h4>3.2 Automated Technologies</h4>
            <p>As you interact with our Service, we may automatically collect technical data about your equipment, browsing actions, and patterns.</p>

            <h4>3.3 Local Storage</h4>
            <p>Many of your tasks and preferences are stored locally on your device using technologies like localStorage to enhance performance and provide offline capabilities.</p>

            <h4>3.4 Third Parties</h4>
            <p>We may receive information about you if you use any of the other websites we operate or services we provide. We also work with third parties (including, for example, business partners, service providers, sub-contractors, analytics providers, search information providers) and may receive information about you from them.</p>
          </div>

          <div className="tos-section">
            <h3>4. How We Use Your Information</h3>
            <p>We use information held about you in the following ways:</p>

            <h4>4.1 To Provide and Maintain our Service</h4>
            <ul className="tos-list">
              <li>To provide the core functionality of task management</li>
              <li>To create and maintain your account</li>
              <li>To provide customer support</li>
              <li>To process and deliver orders and request</li>
            </ul>

            <h4>4.2 To Improve and Personalize our Service</h4>
            <ul className="tos-list">
              <li>To understand how our users use the Service</li>
              <li>To improve our Service, website, and products</li>
              <li>To personalize your experience and to deliver content and product offerings relevant to your interests</li>
            </ul>

            <h4>4.3 To Communicate with You</h4>
            <ul className="tos-list">
              <li>To respond to your comments, questions, and requests</li>
              <li>To provide you with notices about your account</li>
              <li>To send you technical notices, updates, security alerts, and support messages</li>
              <li>To inform you about changes to our Service, products, or policies</li>
            </ul>

            <h4>4.4 For Security and Legal Purposes</h4>
            <ul className="tos-list">
              <li>To protect the security of our Service</li>
              <li>To verify identity and prevent fraud or other unauthorized access</li>
              <li>To enforce our Terms of Service and other legal rights</li>
              <li>To comply with applicable laws and regulations</li>
            </ul>
          </div>

          <div className="tos-section">
            <h3>5. Data Security</h3>
            <p>We have implemented appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.</p>
            <p>Your task data is primarily stored locally on your device, which helps maintain your privacy. If you enable cloud synchronization, we use industry-standard encryption and security protocols to protect your data during transmission and storage.</p>
          </div>

          <div className="tos-section">
            <h3>6. Data Retention</h3>
            <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>
            <p>Task data stored locally on your device remains there until you delete it or uninstall the application. If you use our cloud synchronization features, we retain your data until you delete it or request account deletion.</p>
          </div>

          <div className="tos-section">
            <h3>7. Your Data Protection Rights</h3>
            <p>Depending on your location, you may have the following data protection rights:</p>
            <ul className="tos-list">
              <li><strong>Access:</strong> You can request copies of your personal data.</li>
              <li><strong>Rectification:</strong> You can request that we correct inaccurate or complete incomplete data.</li>
              <li><strong>Erasure:</strong> You can request that we erase your personal data.</li>
              <li><strong>Restriction:</strong> You can request that we restrict the processing of your data.</li>
              <li><strong>Data Portability:</strong> You can request the transfer of your data to you or a third party.</li>
              <li><strong>Objection:</strong> You can object to our processing of your personal data.</li>
              <li><strong>Withdraw Consent:</strong> You can withdraw your consent at any time where we relied on consent to process your data.</li>
            </ul>
            <p>To exercise these rights, please contact us. Note that we may ask you to verify your identity before responding to such requests.</p>
          </div>

          <div className="tos-section">
            <h3>8. Children's Privacy</h3>
            <p>Our Service is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.</p>
          </div>

          <div className="tos-section">
            <h3>9. Third-Party Services</h3>
            <p>Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
            <p>We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
          </div>

          <div className="tos-section">
            <h3>10. Analytics and Cookies</h3>
            <p>We use cookies and similar tracking technologies to track activity on our Service and we hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>
            <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
          </div>

          <div className="tos-section">
            <h3>11. Changes to This Privacy Policy</h3>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          </div>

          <div className="tos-section">
            <h3>12. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
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

export default PrivacyPolicyModal;
