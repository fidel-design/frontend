import { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const bookEvent = async (event_id, price) => {
  try {
    
     const confirm = window.confirm(
      `This event costs KES ${price}. Proceed?`
     );
     if (!confirm) return;

    const response = await axios.post("http://127.0.0.1:5000/book", {
      username,
      event_id
    });

    alert(`Paid KES ${response.data.price} successfully!`);

    console.log("QR:", response.data.qr_code);

  } catch (error) {
    console.log("Booking error:", error);
  }
};

  // fetch events from backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:5000/events");
      console.log("API RESPONSE:", response.data);
      setEvents(response.data);
    } catch (error) {
  console.log("Error fetching events:", error);
}
     finally {
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
                <p>Price: KES {event.price}</p>

                <button
  className="btn btn-primary w-100"
  onClick={() => bookEvent(event.id, event.price)}>

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