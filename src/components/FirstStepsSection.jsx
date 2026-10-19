import React from "react";

export default function FirstStepsSection() {
  return (
    <section className="section first-steps">
      <div className="section-head">
        <div>
          <span className="eyebrow">TAKING THE FIRST STEP</span>
          <h2>
            A clearer path
            <br />
            to the <em>right support.</em>
          </h2>
        </div>
      </div>
      <div className="steps-three-grid">
        <article className="step-card">
          <span className="step-badge">Step 01</span>
          <h3>Tell us what you need</h3>
          <p>
            Call or message the team about a care enquiry, a visit, or an offer
            of support. A short description will help guide the conversation.
          </p>
        </article>
        <article className="step-card">
          <span className="step-badge">Step 02</span>
          <h3>Discuss the details</h3>
          <p>
            For care enquiries, ask about suitability, availability, charges,
            and the information needed. For visits, agree on a suitable date and
            time.
          </p>
        </article>
        <article className="step-card">
          <span className="step-badge">Step 03</span>
          <h3>Plan the next step together</h3>
          <p>
            Confirm arrangements directly with the foundation before travelling,
            bringing supplies, or making a payment.
          </p>
        </article>
      </div>
      <div className="steps-cta">
        <a className="button green" href="tel:+918147942784">
          Call the foundation
        </a>
      </div>
    </section>
  );
}
