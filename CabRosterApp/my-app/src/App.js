import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import CabBookingDashboard from "./components/CabBookingDashboard";
import CabBooking from './components/CabBooking';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/cab-booking-dashboard" element={<CabBookingDashboard />} />
                <Route path="/cab-booking" element={<CabBooking />} />
            </Routes>
        </Router>
    );
}

export default App;