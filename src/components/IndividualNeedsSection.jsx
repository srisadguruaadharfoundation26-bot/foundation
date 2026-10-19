import React from "react";

export default function IndividualNeedsSection() {
  return (
    <section className="section individual-needs">
      <div className="section-head">
        <div>
          <span className="eyebrow">UNDERSTANDING INDIVIDUAL NEEDS</span>
          <h2>
            Care begins
            <br />
            with <em>listening.</em>
          </h2>
        </div>
        <p>
          Choosing support is easier when you can talk openly about daily
          routines, mobility, comfort, and personal preferences.
        </p>
      </div>
      <div className="needs-four-grid">
        <article className="needs-card">
          <h3>Everyday comfort and dignity</h3>
          <p>
            Speak with the team about the elder’s usual routine, the assistance
            they need, and the things that help them feel at ease. Discuss the
            support available before making a care decision.
          </p>
        </article>
        <article className="needs-card">
          <h3>Mobility and rehabilitation</h3>
          <p>
            The foundation’s service information includes neurological and
            orthopaedic rehabilitation. Ask which services are appropriate and
            available for the person’s needs, and share relevant care
            information with the team.
          </p>
        </article>
        <article className="needs-card">
          <h3>Emotional wellbeing and connection</h3>
          <p>
            Companionship, familiar relationships, and feeling heard are
            important parts of a person’s wellbeing. Discuss preferences around
            family contact, visits, and everyday interaction.
          </p>
        </article>
        <article className="needs-card">
          <h3>Nursing and nutrition support</h3>
          <p>
            The centre’s service information includes rehabilitation nursing,
            counselling, and nutrition support. Contact the team to understand
            the scope of care, arrangements, and any individual requirements.
          </p>
        </article>
      </div>
    </section>
  );
}
