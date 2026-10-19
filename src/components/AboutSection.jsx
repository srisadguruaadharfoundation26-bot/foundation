import React from "react";
export default function AboutSection({
  linkHref = "about.html",
  linkText = "Get to know our foundation",
}) {
  return (
    <section className="section about" id="about">
      <div>
        <span className="eyebrow">THE HEART OF OUR FOUNDATION</span>
        <h2>
          Care that feels
          <br />
          like <em>belonging.</em>
        </h2>
      </div>
      <div>
        <p className="lead">
          Every elder deserves to be seen, heard, and cared for.
        </p>
        <p>
          Sri Sadguru Aadhar Foundation is a charity trust and senior citizen
          care home in Bengaluru. We bring together compassionate support and
          rehabilitation, helping people live with dignity and feel connected.
        </p>
        <p>
          Our approach puts the person first — their comfort, their
          independence, and the little things that make a place feel like home.
        </p>
        <a className="text-link" href={linkHref}>
          {linkText} <span>→</span>
        </a>
      </div>
    </section>
  );
}

