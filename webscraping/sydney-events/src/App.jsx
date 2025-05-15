import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./components/EventCard";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/data/events.json")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="display-4 text-center my-4">Sydney Events</h1>
      <div className="row">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="col-md-4">
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No events available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
