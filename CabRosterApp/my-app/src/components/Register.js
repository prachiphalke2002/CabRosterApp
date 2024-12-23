import React, { useState } from 'react';
import '../assets/styles/register.css'; // Import existing styles
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true); // Start loading

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false); // Stop loading
            return;
        }

        try {
            const response = await fetch('https://localhost:7160/api/Users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess('Registration successful! Awaiting approval.');
                setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-header">Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="name">Name:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email:</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password:</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            className="form-input"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                    <button className="btn w-100" type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <div className="register-footer">
                    <p>
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;