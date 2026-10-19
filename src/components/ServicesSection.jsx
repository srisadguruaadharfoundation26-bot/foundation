import React from "react";
export default function ServicesSection() {
  return (
    <section className="section services" id="services">
      <div className="section-head">
        <div>
          <span className="eyebrow">HOW WE CARE</span>
          <h2>
            Support for every
            <br />
            part of <em>life.</em>
          </h2>
        </div>
        <p>
          Thoughtful care, personal attention,
          <br />
          and a helping hand along the way.
        </p>
      </div>
      <div className="cards">
        <article className="service-card">
          <span className="number">01</span>
          <h3>Senior citizen care</h3>
          <p>
            A supportive home for elders, with attention to everyday comfort,
            dignity, and companionship.
          </p>
          <a href="contact.html#contact-us">
            Enquire about care <span>→</span>
          </a>
        </article>
        <article className="service-card">
          <span className="number">02</span>
          <h3>Rehabilitation support</h3>
          <p>
            Personalised support to restore mobility and independence, including
            neurological and orthopaedic rehabilitation.
          </p>
          <a href="contact.html#contact-us">
            Enquire about care <span>→</span>
          </a>
        </article>
        <article className="service-card">
          <span className="number">03</span>
          <h3>Nursing &amp; wellbeing</h3>
          <p>
            Rehabilitation nursing, nutrition support, and counselling as part
            of the centre’s multidisciplinary approach.
          </p>
          <a href="contact.html#contact-us">
            Enquire about care <span>→</span>
          </a>
        </article>
      </div>
    </section>
  );
}
