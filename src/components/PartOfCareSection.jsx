import React from "react";

export default function PartOfCareSection() {
  return (
    <section className="section part-of-care">
      <div className="section-head">
        <div>
          <span className="eyebrow">BE PART OF THE CARE</span>
          <h2>
            There is more than
            <br />
            <em>one way to help.</em>
          </h2>
        </div>
        <p>
          Start with a conversation. The team can guide you towards support that
          is useful and appropriate for current needs.
        </p>
      </div>
      <div className="three-action-grid">
        <article className="action-card">
          <h3>Contribute towards care</h3>
          <p>
            Ask about contributing funds to support the foundation’s work.
            Request official payment details directly from the team before
            making a donation.
          </p>
          <a className="text-link" href="index.html#donate">
            Explore giving <span></span>
          </a>
        </article>
        <article className="action-card">
          <h3>Offer everyday essentials</h3>
          <p>
            If you would like to contribute supplies, contact the team for its
            current needs and suitable quantities before arranging a delivery.
          </p>
          <a className="text-link" href="contact.html">
            Ask what is needed <span></span>
          </a>
        </article>
        <article className="action-card">
          <h3>Share your time</h3>
          <p>
            Interested in volunteering or arranging a group visit? Discuss your
            idea with the foundation so it can consider residents’ comfort and
            available arrangements.
          </p>
          <a className="text-link" href="contact.html">
            Discuss a visit <span></span>
          </a>
        </article>
      </div>
    </section>
  );
}
