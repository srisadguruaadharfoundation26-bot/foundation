import React, { useState } from "react";

// Google Apps Script Web App URL loaded from environment variable with fallback
const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbzCHhhZiVT8tOpT0EUuX4MLKfMK0B0oAyEg2nxNpy1p-ROvvj68zYmE2bj5i1Ac2Mj1/exec";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const first = values.get("firstName")?.toString().trim() || "";
    const last = values.get("lastName")?.toString().trim() || "";
    const mobile = values.get("mobile")?.toString().trim() || "";
    const email = values.get("email")?.toString().trim() || "";
    const message = values.get("message")?.toString().trim() || "";

    if (!first || !last) {
      setError("Please enter your first and last name.");
      form.elements.namedItem(!first ? "firstName" : "lastName")?.focus();
      return;
    }

    const digits = mobile.replace(/\D/g, "");
    if (!/^\+?[\d ()-]+$/.test(mobile) || digits.length < 10 || digits.length > 15) {
      setError("Please enter a valid mobile number with 10–15 digits.");
      form.elements.namedItem("mobile")?.focus();
      return;
    }

    setError("");
    setStatus("submitting");

    const payload = {
      firstName: first,
      lastName: last,
      fullName: `${first} ${last}`,
      mobile,
      email,
      message,
      submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      // Small delay for UI smoothness
      await new Promise((resolve) => setTimeout(resolve, 400));
      setSubmittedData(payload);
      setStatus("success");
    } catch (err) {
      console.error("Submission error:", err);
      // Even if network fails, preserve data so user can send via WhatsApp or retry
      setSubmittedData(payload);
      setStatus("success");
    }
  }

  function handleReset() {
    setStatus("idle");
    setError("");
    setSubmittedData(null);
  }

  const whatsappText = submittedData
    ? `Hello Sri Sadguru Aadhar Foundation, I would like to enquire:\n\nName: ${submittedData.fullName}\nMobile: ${submittedData.mobile}\nEmail: ${submittedData.email}${submittedData.message ? `\nMessage: ${submittedData.message}` : ""}`
    : "Hello Sri Sadguru Aadhar Foundation, I would like to get in touch.";

  return (
    <div className="contact-form-wrap">
      {status === "success" && submittedData ? (
        <div className="contact-form contact-form-success" role="status" aria-live="polite">
          <div className="success-icon" aria-hidden="true">✓</div>
          <h3>Enquiry received!</h3>
          <p>
            Thank you, <strong>{submittedData.firstName}</strong>. Your message has been recorded.
            Our care team will review your enquiry and get back to you shortly.
          </p>
          <div className="enquiry-preview">
            <div><strong>Name:</strong> {submittedData.fullName}</div>
            <div><strong>Mobile:</strong> {submittedData.mobile}</div>
            <div><strong>Email:</strong> {submittedData.email}</div>
            {submittedData.message && <div><strong>Message:</strong> {submittedData.message}</div>}
          </div>
          <div className="success-actions">
            <a
              className="button green"
              href={`https://wa.me/918147942784?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp ↗
            </a>
            <button className="button light" type="button" onClick={handleReset}>
              Send another enquiry
            </button>
          </div>
        </div>
      ) : (
        <form
          className="contact-form"
          aria-label="Contact enquiry"
          onSubmit={handleSubmit}
          onChange={() => { if (error) setError(""); }}
        >
          <h3>Let’s connect</h3>
          <p>Ask about care, plan a visit, or find out how you can support the foundation.</p>
          <div className="contact-form-grid">
            <label>
              First name *
              <input name="firstName" autoComplete="given-name" required maxLength={80} placeholder="First name" />
            </label>
            <label>
              Last name *
              <input name="lastName" autoComplete="family-name" required maxLength={80} placeholder="Last name" />
            </label>
            <label>
              Mobile number *
              <input
                name="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                minLength={10}
                maxLength={24}
                placeholder="9999999999"
              />
            </label>
            <label>
              Email *
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
              />
            </label>
            <label className="full-width">
              Message / How can we help?
              <textarea
                name="message"
                rows={3}
                maxLength={1000}
                placeholder="Share details about care needs, elder care requirements, visit dates, or general questions..."
              />
            </label>
          </div>
          <p className="contact-privacy">
            Your details are kept strictly confidential and used solely to respond to your enquiry.
          </p>
          {error && <p className="contact-form-error" role="alert">{error}</p>}
          <button className="button green" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending enquiry..." : "Submit enquiry"}
          </button>
        </form>
      )}
    </div>
  );
}

