import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const message = await response.text();
        alert('Login successful: ' + message);
        navigate('/form');
      } else {
        const error = await response.text();
        alert('Login failed: ' + error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>QA MANAGEMENT</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Email :</label>
            <input type="email" name="email" placeholder="Enter The Email" required />
          </div>
          <div>
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>PassWord :</label>
            <input type="password" name="password" placeholder="Enter The Password" required />
          </div>
          <Link to="/forget" className="hover p-3 text-white" style={{ color: '#33445f', textDecoration: 'underline', fontWeight: 'bold' }}>
            Forget password
          </Link>
          <p>
            if you don&apos;t have an accouunt{' '}
            <Link to="/signup" className="hover p-3 text-white" style={{ color: '#33445f', textDecoration: 'underline', fontWeight: 'bold' }}>
              Sign Up
            </Link>
          </p>
          <button type="submit" className="hover">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
