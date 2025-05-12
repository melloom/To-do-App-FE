import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TermsOfServiceModal from './TermsOfServiceModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import CookiePolicyModal from './CookiePolicyModal';

const Footer = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  const openTermsModal = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const openPrivacyModal = (e) => {
    e.preventDefault();
    setShowPrivacyModal(true);
  };

  const openCookieModal = (e) => {
    e.preventDefault();
    setShowCookieModal(true);
  };

  return (
    <footer>
      {/* ...existing code... */}
      <div className="footer-links">
        <a href="#" onClick={openTermsModal}>Terms of Service</a>
        <a href="#" onClick={openPrivacyModal}>Privacy Policy</a>
        <a href="#" onClick={openCookieModal}>Cookie Policy</a>
      </div>
      {/* ...existing code... */}

      {/* Modals */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
      <CookiePolicyModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
      />
    </footer>
  );
};

export default Footer;