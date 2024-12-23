import React, { useState, useEffect } from "react";
import axios from "axios";

const CabBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of pending bookings
    axios
      .get("https://localhost:7160/api/Admin/cab-bookings/pending")
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the bookings!", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Cab Booking Details</h1>
      {bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Booking Date</th>
              <th>Shift</th>
              <th>Employee Name</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.Id}>
                <td>{booking.Id}</td>
                <td>{booking.BookingDate}</td>
                <td>{booking.Shift}</td>
                <td>{booking.EmployeeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CabBooking;