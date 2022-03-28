import React, { useState } from 'react';
import './login.css';
import { successfullMessage } from '../util/FetchDataHelper';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {

  const [data, setData] = useState({email: "", password: ""});
  const [error, setError] = useState("");

  const handleChange = ({currentTarget: input}) => {  
    setData({...data, [input.name]: input.value});
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const url ="http://localhost:3050/api/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("userToken", res.data); //saving data into user's browser
      successfullMessage("Welcome Back!");
      window.location = "/";
    }
    catch(error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className='login_content'>
      <form onSubmit={formSubmit} className='signUpForm'>
      <h1>Login</h1>
      <label htmlFor="email"> Email </label>
      <input 
        placeholder='Email'
        type="email" 
        name="email"
        value={data.email}
        onChange={handleChange}  
        required 
      />
      <div className="emailerror"></div>

      <label htmlFor="password"> Password </label>
      <input 
        placeholder='Password'
        type="password" 
        name="password" 
        value={data.password}
        onChange={handleChange} 
        required 
      />
      {error && <div className='error_box'>{error}</div>}
      <span className="newhere">
        <p>New Here??</p>
        <Link to="/signup">Create account </Link>
      </span>
      <button>Login</button>
    </form>

    </div>
  )
}

export default Login;
