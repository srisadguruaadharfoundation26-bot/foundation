import React from "react";

export default function StorySection() {
  return (
    <section className="section story-section">
      <div>
        <span className="eyebrow">MORE THAN A PLACE TO STAY</span>
        <h2>
          Every life has
          <br />a <em>story worth hearing.</em>
        </h2>
      </div>
      <div>
        <p className="lead">
          Growing older brings change. The need for respect, friendship, and
          purpose remains.
        </p>
        <p>
          Choosing care for an elder is a deeply personal decision. Families
          may be looking for everyday support, companionship, or help during
          recovery. Elders themselves may be seeking a reassuring environment
          where their preferences and independence still matter.
        </p>
        <p>
          At Sri Sadguru Aadhar Foundation, our purpose is to bring compassion
          into that conversation. Our senior citizen care and rehabilitation
          focus reflects a belief that physical comfort and emotional
          connection belong together.
        </p>
        <p>
          We welcome conversations with families and people who wish to help.
          Whether you are exploring care or considering a contribution,
          speaking with the team is the first step towards understanding what is
          needed.
        </p>
        <div style={{ marginTop: "28px" }}>
          <a className="button green" href="contact.html">
            Start a conversation
          </a>
        </div>
      </div>
    </section>
  );
}
