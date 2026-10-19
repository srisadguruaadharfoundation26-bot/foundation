import React from "react";

export default function MissionVisionSection() {
  return (
    <section className="section mission-vision" id="mission-vision">
      <div className="mission-vision-intro">
        <span className="eyebrow">OUR PURPOSE</span>
        <h2>
          A better everyday.
          <br />
          <em>A kinder tomorrow.</em>
        </h2>
        <p className="lead">
          Our purpose starts with a simple belief: age should never diminish a
          person’s dignity, voice, or sense of belonging.
        </p>
      </div>
      <div className="mission-vision-grid">
        <div className="mission-card">
          <span className="eyebrow">OUR MISSION</span>
          <h3>To make compassionate care a part of everyday life.</h3>
          <p>
            We aim to support elders through attentive care, companionship, and
            rehabilitation that respects individual needs. By bringing people,
            families, and the community together, we strive to make each day
            more comfortable, connected, and meaningful.
          </p>
        </div>
        <div className="mission-card">
          <span className="eyebrow">OUR VISION</span>
          <h3>A community where every elder feels valued.</h3>
          <p>
            We envision a future in which growing older is met with
            understanding and kindness — where elders have a place to belong,
            support to live with dignity, and opportunities to remain connected
            to the world around them.
          </p>
        </div>
      </div>
    </section>
  );
}
