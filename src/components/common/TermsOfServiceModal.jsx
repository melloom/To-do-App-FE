import React from 'react';
import './TermsOfServiceModal.css';

const TermsOfServiceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="tos-modal-overlay">
      <div className="tos-modal-container">
        <div className="tos-modal-header">
          <h2>Terms of Service</h2>
          <button className="tos-close-button" onClick={onClose}>×</button>
        </div>
        <div className="tos-modal-content">
          <div className="tos-section">
            <h3>1. Introduction and Acceptance</h3>
            <p>Welcome to Tasklio ("Service"). By accessing or using our Service, you agree to be bound by these Terms of Service ("Terms"), our Privacy Policy, and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing the Service.</p>
            <p>We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting. Your continued use of the Service following any modifications indicates your acceptance of the modified Terms.</p>
          </div>

          <div className="tos-section">
            <h3>2. User Accounts and Registration</h3>
            <p>To access certain features of the Service, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
            <p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.</p>
            <p>We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.</p>
          </div>

          <div className="tos-section">
            <h3>3. User Data and Privacy</h3>
            <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Service, you consent to our collection and use of personal data as explained in our Privacy Policy.</p>
            <p>All task data and personal information are securely stored on our servers with industry-standard encryption. We prioritize data security and provide seamless synchronization across all your devices.</p>
          </div>

          <div className="tos-section">
            <h3>4. Intellectual Property Rights</h3>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Tasklio and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
            <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Tasklio.</p>
          </div>

          <div className="tos-section">
            <h3>5. User-Generated Content</h3>
            <p>By submitting content to the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and distribute your content in any existing or future media. You also grant us the right to sublicense these rights and the right to enforce these rights against third parties.</p>
            <p>You represent and warrant that your content does not violate any third-party rights, including intellectual property rights and privacy rights, and that it does not contain any material that is harmful, offensive, or otherwise illegal.</p>
          </div>

          <div className="tos-section">
            <h3>6. Prohibited Uses</h3>
            <p>You agree not to use the Service:</p>
            <ul className="tos-list">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate Tasklio, a Tasklio employee, another user, or any other person or entity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which may harm Tasklio or users of the Service or expose them to liability.</li>
            </ul>
          </div>

          <div className="tos-section">
            <h3>7. Third-Party Links</h3>
            <p>Our Service may contain links to third-party websites or services that are not owned or controlled by Tasklio. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>
            <p>You acknowledge and agree that Tasklio shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p>
          </div>

          <div className="tos-section">
            <h3>8. Termination</h3>
            <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.</p>
            <p>If you wish to terminate your account, you may simply discontinue using the Service or delete your account through the settings in your profile.</p>
            <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
          </div>

          <div className="tos-section">
            <h3>9. Disclaimer of Warranties</h3>
            <p>The Service is provided "as is" and "as available" without any warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
            <p>Tasklio does not warrant that the Service will be uninterrupted or error-free, that defects will be corrected, or that the Service or the server that makes it available are free of viruses or other harmful components.</p>
          </div>

          <div className="tos-section">
            <h3>10. Limitation of Liability</h3>
            <p>In no event shall Tasklio, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
            <ul className="tos-list">
              <li>Your access to or use of or inability to access or use the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service; or</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.</li>
            </ul>
          </div>

          <div className="tos-section">
            <h3>11. Governing Law</h3>
            <p>These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
            <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
          </div>

          <div className="tos-section">
            <h3>12. Contact Us</h3>
            <p>If you have any questions about these Terms, please contact us at support@tasklio.com.</p>
          </div>
        </div>
        <div className="tos-modal-footer">
          <button className="tos-accept-button" onClick={onClose}>I Accept</button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServiceModal;
