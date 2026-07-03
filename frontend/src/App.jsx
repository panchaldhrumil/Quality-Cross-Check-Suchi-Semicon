import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './views/Login'
import Signup from './views/Signup'
import Form from './views/Form';
// import ResetPassword from './views/ResetPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ✅ Important!
import ForgetPassword from './views/ForgetPassword';
import VerifyOtp from './views/VerifyOtp';
import Form1 from './views/Form1'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<Form />} />
        {/* <Route path='/form1' element={<Form1 />} /> */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </Router>
  );
}

export default App
