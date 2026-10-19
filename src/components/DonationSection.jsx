import React, { useState, useRef, useEffect } from "react";
import { bankDetails } from "../donation";
import { QR_PATH_DATA } from "../qr-data";

function SecureDonationQR() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use devicePixelRatio for crisp rendering on high-DPI screens
    const dpr = window.devicePixelRatio || 2;
    const displaySize = 220;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    canvas.style.width = `${displaySize}px`;
    canvas.style.height = `${displaySize}px`;

    // Fill clean white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render QR vector path sharply in-memory
    const scale = (displaySize * dpr) / 54;
    ctx.save();
    ctx.scale(scale, scale);
    ctx.fillStyle = "#000000";
    ctx.fill(new Path2D(QR_PATH_DATA));
    ctx.restore();
  }, []);

  function handleDownload() {
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = 540;
    exportCanvas.height = 540;
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 540, 540);
    ctx.save();
    ctx.scale(540 / 54, 540 / 54);
    ctx.fillStyle = "#000000";
    ctx.fill(new Path2D(QR_PATH_DATA));
    ctx.restore();

    const link = document.createElement("a");
    link.download = "Sri-Sadguru-Aadhar-Foundation-Donation-QR.png";
    link.href = exportCanvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div
      className="secure-qr-wrapper"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="secure-qr-canvas-holder">
        <canvas
          ref={canvasRef}
          className="donation-qr"
          role="img"
          aria-label="Sri Sadguru Aadhar Foundation donation payment QR"
        />
        <div
          className="secure-qr-shield"
          title="Sri Sadguru Aadhar Foundation donation QR"
          aria-hidden="true"
        />
      </div>
      <button
        type="button"
        className="qr-download button-link"
        onClick={handleDownload}
        aria-label="Download donation QR code image"
      >
        Download donation QR ↓
      </button>
    </div>
  );
}

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
      <div
        className="donation-box"
        onContextMenu={(e) => e.preventDefault()}
      >
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
            <SecureDonationQR />
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
