import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'



const Login = () => {

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;


    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // console.log("response.ok:", response.ok);


      if (response.ok) {
        const message = await response.text();
        alert("Login successful: " + message);
        // You can redirect to home/dashboard page here if needed
        navigate('/form'); // 2. Redirect to Form.jsx route
      } else {
        const error = await response.text();
        alert("Login failed: " + error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert("Something went wrong");
    }
  };


  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>

        <h1>QA MANAGEMENT</h1>


        <form style={{ display: 'flex', gap: '50px', flexDirection: 'column' }} onSubmit={handleSubmit} >



          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ fontSize: '20px', fontWeight: 'bold' }} >Email :</label>
            <input
              type="email"
              name="email"
              placeholder='Enter Your E-mail'
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'space-between' }}>
            <div>
              <label style={{ fontSize: '20px', fontWeight: 'bold' }} >PassWord :</label>
              <input
                type="password"
                name="password"
                placeholder='Enter The Password'

              />
            </div>
            <div className="hover p-3 text-white" style={{ color: '#33445f', textDecoration: 'underline' }} >
              <Link to="/forget" className="hover p-3 text-white" style={{ color: '#33445f', textDecoration: 'underline', fontWeight: 'bold' }} > Forget password </Link>
            </div>
          </div>

          <div className='signup' style={{ display: 'flex', gap: '5px' }}>
            <div>if you don't have an accouunt</div>
            <div  > <Link to="/signup" className="hover p-3 text-white" style={{ color: '#33445f', textDecoration: 'underline', fontWeight: 'bold' }} > Sign Up </Link> </div>
          </div>



          <input type="submit" className='hover' style={{ backgroundColor: 'black', width: 'auto', padding: '10px 0px', fontSize: '20px', color: 'white' }} />

        </form>
      </div>
    </div>
  )
}

export default Login