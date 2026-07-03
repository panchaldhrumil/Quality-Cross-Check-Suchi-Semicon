import React, { useState } from 'react';
import { API_URL } from '../config';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('OTP sent successfully!');
        localStorage.setItem('resetEmail', email);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      alert('Something went wrong: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>
    </div>
  );
};

export default ForgetPassword;
