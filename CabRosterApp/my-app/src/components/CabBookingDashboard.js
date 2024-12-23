import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CabBookingDashboard() {
  const navigate = useNavigate();  // useNavigate hook for programmatically navigating
  const [availableDates, setAvailableDates] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [nodalPoints, setNodalPoints] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedNodalPoint, setSelectedNodalPoint] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching data from APIs
  const fetchData = async () => {
    try {
      const [datesResponse, shiftsResponse, nodalPointsResponse] = await Promise.all([
        fetch('https://localhost:7160/api/Calendar/available-dates'),
        fetch('https://localhost:7160/api/Shifts/list'),
        fetch('https://localhost:7160/api/NodalPoint/get-nodal-points')
      ]);

      if (!datesResponse.ok || !shiftsResponse.ok || !nodalPointsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const datesData = await datesResponse.json();
      const shiftsData = await shiftsResponse.json();
      const nodalPointsData = await nodalPointsResponse.json();

      setAvailableDates(datesData.map(date => new Date(date).toLocaleDateString()));  // Convert date formats
      setShifts(shiftsData);
      setNodalPoints(nodalPointsData);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle calendar date selection
  const handleDateSelection = (date) => {
    const dateString = date.toLocaleDateString(); // Format the selected date
    setSelectedDates((prevSelectedDates) => {
      const index = prevSelectedDates.indexOf(dateString);
      if (index !== -1) {
        return prevSelectedDates.filter((selectedDate) => selectedDate !== dateString);
      } else {
        return [...prevSelectedDates, dateString];
      }
    });
  };

  // Handle booking process
  const handleBooking = async () => {
    if (!selectedDates.length || !selectedShift || !selectedNodalPoint) {
      setError('Please select dates, shift, and nodal point.');
      return;
    }

    const userId = localStorage.getItem('userId');
    const bookingData = {
      UserId: userId,
      ShiftId: selectedShift,
      NodalPointId: selectedNodalPoint,
      BookingDates: selectedDates,
    };

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://localhost:7160/api/CabBooking/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.Error || 'Booking failed');
      }
      alert('Cab booked successfully!');
      setSelectedDates([]);
      setSelectedShift('');
      setSelectedNodalPoint('');
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Calendar class to highlight available dates
  const tileClassName = ({ date }) => {
    const dateString = date.toLocaleDateString();
    if (availableDates.includes(dateString)) {
      return 'available-date'; // Highlight available dates
    }
    return '';
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove the user info from localStorage
    navigate('/');  // Redirect to Home page
  };

  return (
    <div>
      <h1>Cab Booking Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={handleLogout}>Logout</button> {/* Logout button */}

      {!loading && !error && (
        <>
          <h3>Select Dates</h3>
          <div>
            <Calendar
              onChange={handleDateSelection}
              value={new Date()}
              tileClassName={tileClassName}
              selectRange={true} // Allow range selection
            />
          </div>

          <h3>Select Shift</h3>
          <select value={selectedShift} onChange={(e) => setSelectedShift(e.target.value)}>
            <option value="">Select a shift</option>
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>
                {shift.shiftTime}
              </option>
            ))}
          </select>

          <h3>Select Nodal Point</h3>
          <select value={selectedNodalPoint} onChange={(e) => setSelectedNodalPoint(e.target.value)}>
            <option value="">Select a nodal point</option>
            {nodalPoints.map((nodalPoint) => (
              <option key={nodalPoint.id} value={nodalPoint.id}>
                {nodalPoint.locationName}
              </option>
            ))}
          </select>

          <div>
            <button onClick={handleBooking} disabled={loading}>Book Cab</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CabBookingDashboard;
