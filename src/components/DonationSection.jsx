import React, { useState } from "react";
import { bankDetails } from "../donation";

export default function DonationSection() {
  const [tab, setTab] = useState("upi");
  const [message, setMessage] = useState("");

  async function copy(label, value) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(`✓ ${label} copied to clipboard!`);
      setTimeout(() => setMessage(""), 3500);
    } catch {
      setMessage("Please select the bank detail and copy it manually.");
    }
  }
  return (
    <section className="donate section" id="donate">
      <div>
        <span className="eyebrow">A LITTLE KINDNESS GOES A LONG WAY</span>
        <h2>
          Help make their
          <br />
          everyday <em>brighter.</em>
        </h2>
        <p>
          Your support can help the foundation provide care and comfort to
          elders. Speak with our team about contributing funds, essentials, or
          your time.
        </p>
        <div className="donation-tags">
          <span>Daily essentials</span>
          <span>Care &amp; comfort</span>
          <span>Companionship</span>
        </div>
      </div>
      <div className="donation-box">
        <span className="eyebrow">SUPPORT OUR ELDERS</span>
        <h3>Give with a full heart.</h3>
        <p className="donation-recipient">
          Sri Sadguru Aadhar Foundation
          <br />
          <span>UCO Bank · JP Nagar</span>
        </p>
        <div
          className="payment-options"
          role="group"
          aria-label="Donation method"
        >
          <button
            type="button"
            aria-pressed={tab === "upi"}
            onClick={() => {
              setTab("upi");
              setMessage("");
            }}
          >
            Scan &amp; pay
          </button>
          <button
            type="button"
            aria-pressed={tab === "bank"}
            onClick={() => {
              setTab("bank");
              setMessage("");
            }}
          >
            Bank transfer
          </button>
        </div>
        {tab === "upi" ? (
          <div className="upi-payment">
            <p>Scan with any UPI app to support our elders.</p>
            <img
              className="donation-qr"
              src="assets/donation-qr-clear.svg"
              alt="Sri Sadguru Aadhar Foundation donation payment QR provided by the foundation"
              loading="lazy"
            />
            <a
              className="qr-download"
              href="assets/donation-qr-clear.svg"
              download="Sri-Sadguru-Aadhar-Foundation-Donation-QR.svg"
            >
              Download donation QR ↓
            </a>
            <a
              className="text-link"
              href="assets/uco-bank-payment.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              View bank-issued payment card ↗
            </a>
            <p className="payment-hint">
              Check the recipient in your UPI app before paying.
            </p>
          </div>
        ) : (
          <div className="bank-payment">
            <p>Transfer directly to the foundation’s UCO Bank account.</p>
            <dl>
              {Object.entries(bankDetails).map(([label, value]) => (
                <div key={label} className="bank-detail">
                  <dt>{label}</dt>
                  <dd>
                    <span>{value}</span>
                    {["Account Number", "IFSC Code"].includes(label) && (
                      <button
                        className="copy-detail"
                        type="button"
                        onClick={() => copy(label, value)}
                        aria-label={`Copy ${label}`}
                      >
                        Copy
                      </button>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        <p className="copy-status" role="status" aria-live="polite">
          {message}
        </p>
        <a className="donation-call" href="tel:+918147942784">
          Need help? Call +91 81479 42784
        </a>
        <small>
          Payments take place in your bank or UPI app. Contact our team for
          donation enquiries.
        </small>
      </div>
    </section>
  );
}
