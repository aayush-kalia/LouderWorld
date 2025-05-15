import React from "react";
import EmailForm from "./EmailForm";

function EventCard({ event }) {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">
          <strong>Date:</strong> {event.date} <br />
          <strong>Time:</strong> {event.time} <br />
          <strong>Venue:</strong> {event.venue} <br />
          <strong>Description:</strong> {event.description}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#emailModal-${event.id}`}
        >
          GET TICKETS
        </button>
        <div
          className="modal fade"
          id={`emailModal-${event.id}`}
          tabIndex="-1"
          aria-labelledby={`emailModalLabel-${event.id}`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`emailModalLabel-${event.id}`}>
                  Join Our Event Updates
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <EmailForm
                  ticketUrl={event.ticket_url}
                  modalId={`emailModal-${event.id}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
