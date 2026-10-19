import React from "react";
import ServicesSection from "../components/ServicesSection";
import EverydaySupportSection from "../components/EverydaySupportSection";
import IndividualNeedsSection from "../components/IndividualNeedsSection";
import HealthcareSection from "../components/HealthcareSection";
import FirstStepsSection from "../components/FirstStepsSection";
import ContactSection from "../components/ContactSection";

export default function ServicesPage({ onOpenImage }) {
  return (
    <main id="main">
      <section className="page-intro">
        <span className="eyebrow">PERSON-CENTRED SUPPORT</span>
        <h1>
          A helping hand.
          <br />
          <em>At every step.</em>
        </h1>
        <p>Senior citizen care and rehabilitation support in Bengaluru.</p>
      </section>
      <ServicesSection />
      <EverydaySupportSection />
      <IndividualNeedsSection />
      <section className="section brochure">
        <div>
          <span className="eyebrow">LEARN MORE</span>
          <h2>
            Our rehabilitation
            <br />
            services.
          </h2>
          <p>
            Explore the foundation’s service information, including
            rehabilitation, nursing, counselling, and nutritional support.
            Contact the team to discuss individual care needs and availability.
          </p>
          <a
            className="button green"
            href="assets/services-brochure.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            View service brochure{" "}
          </a>
        </div>
        <img
          src="assets/services-brochure.png"
          alt="Foundation rehabilitation services brochure"
          loading="lazy"
        />
      </section>
      <HealthcareSection />
      <FirstStepsSection />
      <ContactSection />
    </main>
  );
}
