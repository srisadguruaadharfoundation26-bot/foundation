import React from "react";
import ContactSection from "../components/ContactSection";
import DonationSection from "../components/DonationSection";
export default function ContactPage({ onOpenImage }) {
  return (
    <main id="main">
      <section className="page-intro">
        <span className="eyebrow">WE’RE HERE TO HELP</span>
        <h1>
          Let’s make a<br />
          <em>connection.</em>
        </h1>
        <p>
          Care enquiries, visits, volunteering, and contributions — speak with
          our team.
        </p>
      </section>
      <ContactSection />
      <DonationSection />
    </main>
  );
}
