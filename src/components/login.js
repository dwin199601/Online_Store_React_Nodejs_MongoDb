import React, { useState, useEffect } from 'react';
import './login.css';
import {useCookies} from "react-cookie";
import { successfullMessage } from '../util/FetchDataHelper';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({email: "", password: ""});
  const [error, setError] = useState("");

  const handleChange = ({currentTarget: input}) => {  
    setValues({...values, [input.name]: input.value});
  }

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const url ="http://localhost:6050/login";
      const { data } = await axios.post(url, {
        ...values
      },
        { withCredentials: true}
      );
      if(data){
        if(data.errors){
          const {email, password} = data.errors;
          if(email){
            setError(email);
          }
          else if(password) {
            setError(password);
          }
        }
        else {
          window.location = "/";
        }
      }
    }
    catch(error) {
      console.log(error)
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
        value={values.email}
        onChange={handleChange}  
        required 
      />
      <div className="emailerror"></div>

      <label htmlFor="password"> Password </label>
      <input 
        placeholder='Password'
        type="password" 
        name="password" 
        value={values.password}
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
