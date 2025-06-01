import axios  from 'axios';
import React from 'react'
//import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
//import jwtDecode from 'jwt-decode';
import '@fortawesome/fontawesome-free/css/all.min.css';
export const  Logout = () =>{
  const navigate =  useNavigate();
  const handleLogout = () => {
    // Call your API endpoint to log the user out
    // Implement your logout logic here, such as clearing the token from local storage
    axios.get('http://localhost:3000/api/logout')
    .then(res => {
      // Handle successful logout
      if(res.data.status)
        {
        console.log(res.data);
        console.log("User Logout successfully");
        alert("User Logout successfully");
        localStorage.removeItem('token'); // Redirect to Login &  Home page after successful logout
        confirm("User Logout successfully");
        //console.log("User Logout successfully");
        navigate('/login'); // Redirect to Login & Home page after successful logout
      }
      }).catch(error => {
      console.error("Logout failed:", error);
      alert("An error occurred during logout.");
    });
  }
     // Redirect to Login & Home page after successful logout
  // Call the handleLogout function when the component is rendered
  // Render the logout component
  return (
    <div className="container-fluid py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow text-center" style={{ maxWidth: 400, width: '100%' }}>
        <h1 className="mb-3">Logout</h1>
        <h2 className="mb-3 h5">Services</h2>
        <p className="mb-4">You are logged out. Please come back soon.</p>
        <button onClick={handleLogout} className="btn btn-danger w-100">
          <i className="fas fa-sign-out-alt me-2"></i>Logout
        </button>
      </div>
    </div>
  );
}

//export default Logout













