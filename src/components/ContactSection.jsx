import React from "react";
import ContactForm from "./ContactForm";
export default function ContactSection() {
  return (
    <section className="section contact contact-with-form" id="contact-us">
      <div>
        <span className="eyebrow">LET’S CONNECT</span>
        <h2>
          A conversation is
          <br />a lovely <em>start.</em>
        </h2>
        <p>
          Ask about care, plan a visit, or find out how you can support the
          foundation.
        </p>
        <a
          className="button green"
          href="https://wa.me/918147942784"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat with our team{" "}
        </a>
      </div>
      <div className="contact-panel">
      <ContactForm />
      <div className="contact-details">
        <div>
          <span>COME SAY HELLO</span>
          <p>
            #46, Aakarsh Woods, 7th ‘A’ Main Road,
            <br />
            Nobo Nagar, Kalena Agrahara,
            <br />
            Bengaluru, Karnataka – 560076
          </p>
          <a
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://maps.app.goo.gl/YMZ3VSHJV5FrATBx9"
          >
            Get directions{" "}
          </a>
        </div>
        <div>
          <span>GIVE US A CALL</span>
          <a className="phone" href="tel:+918147942784">
            +91 81479 42784
          </a>
          <a className="phone" href="tel:+918197526597">
            +91 81975 26597
          </a>
        </div>
        <div>
          <span>EMAIL US DIRECTLY</span>
          <a className="phone contact-email" href="mailto:srisadguruaadharfoundation26@gmail.com" style={{ fontSize: "16px", wordBreak: "break-all" }}>
            srisadguruaadharfoundation26@gmail.com
          </a>
        </div>
      </div>

      </div>
    </section>
  );
}
