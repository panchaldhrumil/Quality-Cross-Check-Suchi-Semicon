import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSendOTP = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("OTP sent successfully!");
        console.log("OTP:", data.otp); // for testing only — remove in production
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
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
