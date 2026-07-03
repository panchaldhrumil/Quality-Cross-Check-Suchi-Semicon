import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'


const Signup = () => {

   const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
 

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    console.log("response.ok:", response.ok);

    if (response.ok) {
      const data = await response.text(); // or .json() if your backend sends JSON
      alert("Registration successful: " + data);
      // Redirect to login or home page if needed
       navigate('/form'); // 2. Redirect to Form.jsx route
    } else {
      const error = await response.text();
      alert("Registration failed: " + error);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert("Something went wrong");
  }
};


  return (
         <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent:'space-evenly' , alignItems: 'center' }}>

          <h1>QA MANAGEMENT</h1>

          <form style={{ display: 'flex', gap: '50px', flexDirection: 'column' }} onSubmit={handleSubmit}>

            <div style={{ display: 'flex', gap: '20px' }}>
              <label  style={{ fontSize: '20px', fontWeight: 'bold' }}>Name :</label>
              <input
                type="text"
                name="name"
                placeholder='Enter Your Name'

              />
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <label  style={{ fontSize: '20px', fontWeight: 'bold' }} >Email :</label>
              <input
                type="email"
                name="email"
                placeholder='Enter Your E-mail'
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
              <label  style={{ fontSize: '20px', fontWeight: 'bold' }} >PassWord :</label>
              <input
                type="password"
                name="password"
                placeholder='Enter The Password'

              />
            </div>

            <div style={{display:'flex', gap:'5px'}} >
                  <div>if you already have an accouunt</div>
             <div  > <Link to="/"  className="hover p-3 text-white" style={{ color: '#33445f', textDecoration:'underline' ,fontWeight:'bold'}} > Login </Link> </div> 
            </div>

            <input type="submit" className='hover' style={{ backgroundColor: 'black', width: 'auto', padding: '10px 0px', fontSize: '20px', color: 'white' }} />
            {/* <button type="submit"  >Submit</button> */}

          </form>
        </div>
      </div>
  )
}

export default Signup