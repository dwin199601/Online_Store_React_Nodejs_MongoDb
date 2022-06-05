import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import './signup.css'
import { successfullMessage } from '../util/FetchDataHelper';
import { Link } from 'react-router-dom';
import {useCookies} from "react-cookie";

function Signup() {
  const [cookies] = useCookies([]);
  const [values, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = ({currentTarget: input}) => {
    setValue({...values, [input.name]: input.value});
  };

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:6050/signup";
      const { data } = await axios.post(url, {...values}, {
        withCredentials: true
      })
      if(data.errors) {
        const {firstName, lastName, email, password} = data.errors;
        if(firstName){
          setError(firstName);
        }
        else if(lastName){
          setError(lastName);
        }
        else if(email){
          setError(email);
        }
        else if(password) {
          setError(password);
        }
      }
      else setError("");
      if(data.user) {
        window.location = "/";
      }  
    }
    catch(error){
       console.log(error)
    }
  }
  

  return (
    <div className='signup_content'>
    <form onSubmit={formSubmit} className='signUpForm'>
      <h1>Create Account</h1>
      <label htmlFor="firstName"> First Name </label>
      <input 
        type="text" 
        name="firstName"
        placeholder='First name'
        value={values.firstName}
        onChange={handleChange} 
      />
      <label htmlFor="lastName"> Last Name </label>
      <input 
        placeholder='Last name'
        type="text" 
        name="lastName"
        value={values.lastName}
        onChange={handleChange} 
      />
      <label htmlFor="email"> Email </label>
      <input 
        placeholder="Email"
        type="email" 
        name="email"
        value={values.email}
        onChange={handleChange}  
      />
      <label htmlFor="password"> Password </label>
      <input 
        placeholder="Password"
        type="password" 
        name="password" 
        value={values.password}
        onChange={handleChange} 
      />
      {error && <div className='error_box'>{error}</div>}
      <button>Sign Up</button>
      <span className='checkIfloggedin'>
        <p>Have account??
          <Link to="/login">
            <button className='loginBtn'>Login</button>
          </Link>
        </p>
      </span>
    </form>
    </div>
  )
}

export default Signup;
