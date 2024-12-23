import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Home.css'; // Updated to use the same styling for simplicity
import axios from 'axios';

const Home = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('Simple Cab Booking'); // Default message
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWelcomeMessage = async () => {
            try {
                const response = await axios.get('https://localhost:7160/api/Home');
                setWelcomeMessage(response.data);
            } catch (error) {
                console.error("Failed to fetch welcome message:", error);
            }
        };
        fetchWelcomeMessage();
    }, []);

    return (
        <div className="home-container">
            <h1>{welcomeMessage}</h1>
            <div className="button-group">
                <button className="login-button" onClick={() => navigate('/login')}>
                    Login
                </button>
                <button className="signup-button" onClick={() => navigate('/register')}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Home;