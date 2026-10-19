import React from "react";
export default function HealthcareSection() {
  return (
    <section className="section healthcare" id="for-healthcare">
      <div className="showcase-head">
        <span className="eyebrow">EXPLORE FOR HEALTH CARE</span>
        <span className="site-address">www.forhealthcare.org</span>
      </div>
      <div className="healthcare-grid">
        <a
          className="healthcare-visual"
          href="https://www.forhealthcare.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit FOR HEALTH CARE website (opens in a new tab)"
        >
          <div className="showcase-brand">
            <img src="assets/fhc-logo.svg" alt="FOR HEALTH CARE" />
          </div>
          <img
            className="healthcare-photo"
            src="assets/fhc-care.png"
            alt="FOR HEALTH CARE home nursing and elderly support"
            loading="lazy"
          />
          <div className="showcase-label">Care, wherever you call home.</div>
        </a>
        <div className="healthcare-copy">
          <span className="eyebrow">HOME HEALTHCARE &amp; REHABILITATION</span>
          <h2>
            Care beyond
            <br />
            <em>our doorstep.</em>
          </h2>
          <p>
            Discover FOR HEALTH CARE’s home nursing, physiotherapy, elderly
            care, and recovery support in Bengaluru.
          </p>
          <div className="care-list">
            <span>Home nursing</span>
            <span>Physiotherapy</span>
            <span>Elderly care</span>
            <span>Recovery support</span>
          </div>
          <a
            className="button green"
            href="https://www.forhealthcare.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit FOR HEALTH CARE
          </a>
          <small>Opens the FOR HEALTH CARE website in a new tab.</small>
        </div>
      </div>
    </section>
  );
}
