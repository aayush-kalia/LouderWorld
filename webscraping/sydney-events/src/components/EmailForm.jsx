import React, { useState } from "react";
import { Modal } from "bootstrap";

function EmailForm({ ticketUrl, modalId }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (!consent) {
      setError("Please agree to receive updates.");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/xldbazna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const modalElement = document.getElementById(modalId);
        const modal = Modal.getInstance(modalElement);
        modal.hide();
        window.location.href = ticketUrl; // Redirect to ticket URL
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id={`consent-${modalId}`}
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <label className="form-check-label" htmlFor={`consent-${modalId}`}>
          I agree to receive event updates (required).
        </label>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary w-100">
        Submit
      </button>
    </form>
  );
}

export default EmailForm;
