import React, { useEffect } from 'react';
import './styles/index.css';
import Header from './Header';
import Hero from './Hero';
import BrandLogos from './BrandLogos';
import Features from './Features';
import Workflow from './Workflow';
import AppShowcase from './AppShowcase';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import FAQ from './FAQ';
import CTA from './CTA';
import Footer from './Footer';
import BackToTop from './BackToTop';
import { scrollToElementCentered } from '../../utils/scrollUtils';

const LandingPage = () => {
  // Handle hash navigation when the page loads
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // Remove the # character

      // Check if this is a fresh page load or navigation within the app
      const isPageRefresh = !window.performance.getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('navigate');

      // Only scroll to the element if it's not a page refresh
      if (!isPageRefresh) {
        // Use our improved scroll utility with a slightly longer delay to ensure DOM is ready
        scrollToElementCentered(id, { offset: 80, delay: 100 });
      } else {
        // If it's a page refresh, clear the hash to prevent automatic scrolling
        window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
    }
  }, []);

  return (
    <div className="landing-page">
      <Header />
      <main className="landing-main">
        <Hero />
        <BrandLogos />
        <Features />
        <Workflow />
        <AppShowcase />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA /> {/* Make sure CTA is included and not conditionally hidden */}
      </main>
      <Footer />
      <BackToTop /> {/* Add the BackToTop component */}
    </div>
  );
};

export default LandingPage;
