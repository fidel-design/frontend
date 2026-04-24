import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const username = "testuser";

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/bookings/${username}`
      );
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Bookings</h2>

      {bookings.map((b) => (
        <div key={b.id} className="card p-3 mb-3">
          <h5>{b.name}</h5>
          <p>Date: {b.date}</p>
          <p>Location: {b.location}</p>
          <p>Price: KES {b.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;