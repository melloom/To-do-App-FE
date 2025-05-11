import React, { useEffect } from 'react';
import './styles/BrandLogos.css';

const BrandLogos = () => {
  useEffect(() => {
    const logos = document.querySelectorAll('.logo-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    logos.forEach(logo => observer.observe(logo));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="brand-logos-section">
      <div className="brand-logos-container">
        <h3 className="trusted-by">Trusted by professionals from</h3>

        <div className="logo-grid">
          <div className="logo-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="brand-logo"
            />
          </div>

          <div className="logo-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
              alt="Microsoft"
              className="brand-logo"
            />
          </div>

          <div className="logo-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon"
              className="brand-logo"
            />
          </div>

          <div className="logo-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              className="brand-logo"
            />
          </div>

          <div className="logo-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
              alt="Meta"
              className="brand-logo"
            />
          </div>

          <div className="logo-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
              alt="Airbnb"
              className="brand-logo"
            />
          </div>

          <div className="logo-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="brand-logo"
            />
          </div>

          <div className="logo-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
              alt="Spotify"
              className="brand-logo spotify-logo"
            />
          </div>

          <div className="logo-item">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg"
              alt="BMW"
              className="brand-logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;