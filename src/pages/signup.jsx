import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/signup.css';

export default function DiscoverSignIn() {
  // Start with empty fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // React Router navigation hook
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple credential check
    if (email === 'admin@gmail.com' && password === '123456') {
      console.log('Login successful!');
      navigate('/dashboard'); // ✅ Redirect to Dashboard
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">

        {/* Left Branding Panel */}
        <div className="brand-panel">
          <p className="brand-title">Discover</p>
          <p className="brand-tagline">A stitch in time saves nine</p>
        </div>

        {/* Right Form Panel */}
        <div className="form-panel">
          <div className="signin-header">
            <h2 className="signin-title">Admin Sign In</h2>
            <p className="signin-subtitle">Enter your credentials below</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
            <p>email:admin@gmail.com</p>
            <p>password:123456</p>
          </form>
        </div>
      </div>
    </div>
  );
}
