import React, { useState } from 'react';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem('resetEmail');

    const res = await fetch('http://localhost:3000/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const message = await res.text();
    alert(message);
    if (res.ok) {
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify OTP & Reset Password</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        required
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        required
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default VerifyOtp;
