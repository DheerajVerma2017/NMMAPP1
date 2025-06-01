//import React from "react"
import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
//import "../App.css";
import Axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Signup = () =>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // const [user, setUser] = useState({ username: '', email: '', password: '' });
    const handleSubmit = async (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3000/api/signup', {
            username,
            email,
            password
        }).then(response => {
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
             alert("User Signup successfully");
            navigate("/login"); // Redirect to Login & Home page after successful signup
        }).catch(error => {
            console.log(error);
            alert("User Signup failed. Please try again");

        })
    };
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-center">Welcome to NMM</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">User Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Full Name*"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-envelope"></i></span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Your Email*"
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone no</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter Your Phone no*"
              onChange={(e) => setPhone && setPhone(e.target.value)}
            />
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
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            <i className="fas fa-user-plus me-2"></i>Signup
          </button>
          <div className="text-center">
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};































































































/* 
Methods for registering 2
export const Signup = () =>{
  return (
  <>  
    <h1>Signup</h1>
    <h2>Services</h2>
    <div>
      
    </div>
 </>
  );
};




<label htmlFor="username">Username</label>


/*
Methods for registering 1
import React from 'react'

export const Signin() {
  return (
    <div>Signin</div>
 )
}
 export default Signup
*/
