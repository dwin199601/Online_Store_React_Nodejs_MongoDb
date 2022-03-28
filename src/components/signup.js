import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import './signup.css'
import { successfullMessage } from '../util/FetchDataHelper';
import { Link } from 'react-router-dom';

function Signup() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value});
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3050/api/signup";
      const { data: res } = await axios.post(url, data)
      .then(res => {
        successfullMessage("User was created!");
        navigate("/login");
      })
      console.log(res.message);
    }
    catch(error){
      if(error.response && error.response.status >= 400 && error.response.status <= 500){
        setError(error.response.data.message);
      }
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
        value={data.firstName}
        onChange={handleChange} 
        required
      />
      <label htmlFor="lastName"> Last Name </label>
      <input 
        placeholder='Last name'
        type="text" 
        name="lastName"
        value={data.lastName}
        onChange={handleChange} 
        required
      />
      <label htmlFor="email"> Email </label>
      <input 
        placeholder="Email"
        type="email" 
        name="email"
        value={data.email}
        onChange={handleChange}  
        required 
      />

      <label htmlFor="password"> Password </label>
      <input 
        placeholder="Password"
        type="password" 
        name="password" 
        value={data.password}
        onChange={handleChange} 
        required 
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
