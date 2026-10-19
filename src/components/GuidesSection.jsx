import React from "react";

export default function GuidesSection() {
  return (
    <section className="section guides-values">
      <div className="section-head">
        <div>
          <span className="eyebrow">WHAT GUIDES US</span>
          <h2>
            Small actions.
            <br />
            <em>Deeply held values.</em>
          </h2>
        </div>
        <p>
          The way we listen, speak, and offer support matters just as much as the
          care itself.
        </p>
      </div>
      <div className="values-four-grid">
        <article className="guide-card">
          <span className="guide-num">01</span>
          <h3>Dignity</h3>
          <p>
            Respect each person’s privacy, preferences, and life experience.
            Growing older should never mean losing one’s voice.
          </p>
        </article>
        <article className="guide-card">
          <span className="guide-num">02</span>
          <h3>Compassion</h3>
          <p>
            Meet people with patience and warmth. A thoughtful conversation or a
            reassuring presence can make a meaningful difference.
          </p>
        </article>
        <article className="guide-card">
          <span className="guide-num">03</span>
          <h3>Individual attention</h3>
          <p>
            Recognise that every person has a different story, routine, and set of
            needs. Begin by listening and understanding.
          </p>
        </article>
        <article className="guide-card">
          <span className="guide-num">04</span>
          <h3>Connection</h3>
          <p>
            Value the relationships between elders, families, caregivers, and
            the wider community. Belonging is part of wellbeing.
          </p>
        </article>
      </div>
    </section>
  );
}
