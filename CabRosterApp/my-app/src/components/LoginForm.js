import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/LoginForm.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const url = 'https://localhost:7160/api/Login/LoginForm';
        const body = { Email: email, Password: password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('role', data.role);

                if (data.role === 'Admin') navigate('/admin-dashboard');
                else if (data.role === 'User') navigate('/cab-booking-dashboard');
                else setError('Invalid role. Contact support.');
            } else throw new Error(data.message || 'Login failed.');
        } catch (error) {
            setError(error.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2 className="login-title">Login</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-group">
                        <label className="input-label">Email:</label>
                        <input
                            className="input-field"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password:</label>
                        <input
                            className="login-input-field"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="submit-button" type="submit" disabled={loading}>
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <div className="login-footer">
                    <p>
                        Don't have an account? {' '}
                        <a href='/register'>Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default LoginForm;