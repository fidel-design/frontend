import { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch events from backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/events");
      setEvents(response.data);
    } catch (error) {
      console.log("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Events</h2>

      {loading && <p>Loading events...</p>}

      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <div className="card shadow">

              {/* IMAGE */}
              <img
                src={`http://127.0.0.1:5000/uploads/${event.image}`}
                className="card-img-top"
                alt="event"
                height="200"
              />

              <div className="card-body">
                <h5>{event.name}</h5>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>

                <button className="btn btn-primary w-100">
                  Book Ticket
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;