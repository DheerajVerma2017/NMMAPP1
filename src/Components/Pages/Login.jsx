//import React from "react"
import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
//import { FiMail, FiKey} from 'react-icons/fi';
//import "../App.css";
import Axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Login = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // const [user, setUser] = useState({ username: '', email: '', password: '' });
    // TODO: Validate inputs
    // TODO: Handle errors
    // TODO: Implement JWT token handling and refresh token logic
    // TODO: Add user profile page and update functionality
    Axios.defaults.withCredentials = true;
    const handleSubmit = async (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/api/login', {
            email,
            password
        }).then(response => {
          console.log("hello from login response");
            //console.log(response.data);
            //setUser(response.data);  // Handle response data
           // navigate("/Dashboard");  // Redirect to dashboard or Home page after successful login
            alert("User Login successfully");
            navigate("/"); // Redirect to dashboard or Home page after successful login
            //setUser(response.data); // Set user data from response
        }).catch(error => {
            console.log(error); // Handle error
            alert("User Login failed. Please try again");

        })
        // setUser({user, email: '', password: '' }); // Clear input fields after submission



  };
    
  return (
   <>  
     <div className="container-fluid py-5 d-flex justify-content-center align-items-center min-vh-100">
    <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">Welcome to Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-envelope"></i></span>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email*"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-lock"></i></span>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Your Password*"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-3">
          <i className="fas fa-sign-in-alt me-2"></i>Login
        </button>
        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  </div>
    </>
  );
};
//export default Login
/*
import React from 'react'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login
*/
