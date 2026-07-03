import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { API_URL } from '../config';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.text();
        alert('Registration successful: ' + data);
        navigate('/form');
      } else {
        const error = await response.text();
        alert('Registration failed: ' + error);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>QA MANAGEMENT</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Name :</label>
            <input type="text" name="name" placeholder="Enter The Name" required />
          </div>
          <div>
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Email :</label>
            <input type="email" name="email" placeholder="Enter The Email" required />
          </div>
          <div>
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>PassWord :</label>
            <input type="password" name="password" placeholder="Enter The Password" required />
          </div>
          <p>
            if you already have an accouunt{' '}
            <Link to="/" className="hover p-3 text-white" style={{ color: '#33445f', textDecoration: 'underline', fontWeight: 'bold' }}>
              Login
            </Link>
          </p>
          <button type="submit" className="hover">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
