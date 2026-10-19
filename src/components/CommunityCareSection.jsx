import React from "react";

export default function CommunityCareSection() {
  return (
    <section className="section community-care" id="join-us">
      <div className="section-head">
        <div>
          <span className="eyebrow">JOIN THE COMMUNITY AROUND CARE</span>
          <h2>
            Care grows when
            <br />
            <em>we share it.</em>
          </h2>
        </div>
        <p>
          Families, supporters, professionals, and community groups each have a
          meaningful role in creating a more caring environment for elders.
        </p>
      </div>
      <div className="community-grid">
        <article className="community-card">
          <h3>For families</h3>
          <p>
            Ask questions openly, share the elder’s routines and preferences,
            and stay connected through visits and conversations.
          </p>
        </article>
        <article className="community-card">
          <h3>For supporters</h3>
          <p>
            Contribute funds or everyday essentials after speaking with the
            foundation about current priorities and official arrangements.
          </p>
        </article>
        <article className="community-card">
          <h3>For organisations</h3>
          <p>
            Explore a partnership, employee volunteering activity, healthcare
            support, or a community initiative that can grow with care.
          </p>
        </article>
        <article className="community-card">
          <h3>For volunteers</h3>
          <p>
            Offer your time, creative skills, or companionship. Contact the team
            first so every visit respects residents’ comfort and routines.
          </p>
        </article>
      </div>
      <div className="community-cta-box">
        <p>
          Want to join us? Tell us what you would like to contribute and we’ll
          help you find a suitable next step.
        </p>
        <a className="button green" href="contact.html#join-us">
          Connect with us
        </a>
      </div>
    </section>
  );
}
