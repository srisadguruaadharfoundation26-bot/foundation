import React from "react";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import HealthcareSection from "../components/HealthcareSection";
import GallerySection from "../components/GallerySection";
import ContactSection from "../components/ContactSection";
import DonationSection from "../components/DonationSection";
export default function HomePage({ onOpenImage, onOpenVideo }) {
  return (
    <main id="main">
      <section className="hero background-image-hero" id="hero">
        <img className="hero-background" src="assets/care.jpg" width="1180" height="945" alt="An elderly couple enjoying time in a garden" fetchPriority="high" />
        <div className="hero-copy">
          <span className="eyebrow">SRI SADGURU AADHAR FOUNDATION</span>
          <h1>
            A little care.
            <br />A whole new
            <br />
            <em>chapter.</em>
          </h1>
          <p>
            Because growing older should mean growing closer — to care,
            comfort, and community.
          </p>
          <div className="hero-actions">
            <a href="#donate" className="button orange">
              Make a difference
            </a>
            <a href="about.html" className="underlink">
              Our story
            </a>
          </div>
        </div>
        <div className="hero-note">
          <span>BENGALURU, INDIA</span>
          <p>
            A home for dignity.
            <br />A community for life.
          </p>
        </div>
      </section>
      <div className="values">
        <span>
          01 <strong>A place to call home</strong>
        </span>
        <span>
          02 <strong>Care that puts people first</strong>
        </span>
        <span>
          03 <strong>Kindness that brings us together</strong>
        </span>
      </div>
      <AboutSection />
      <ServicesSection />
      <DonationSection />
      <HealthcareSection />
      <GallerySection onOpenImage={onOpenImage} onOpenVideo={onOpenVideo} />
      <ContactSection />
    </main>
  );
}
