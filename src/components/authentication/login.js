import React, { useState } from "react";
import { Link } from "react-router-dom";
import {signInWithGoogle, logInWithEmailAndPassword } from "./firebase";
import './login.css'
import {CheckIfUserRegistered} from '../../util/UserAuthHelper'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  CheckIfUserRegistered('/dashboard');

  const signIn = (e) => {
    try
    {
      if(!email || !password){
        alert("You must enter email and password to login!!");
      }
      else logInWithEmailAndPassword(email, password);  
    }
    catch(error){
      console.log(error.message);
    }
    e.preventDefault();
  }
     
return (
    <div className="login">
        <div className="login__container">
          <input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button
            className="login__btn"
            onClick = {(e)=>signIn(e)}
          >
          Login
          </button>

          <button 
            className="login__btn login__google" 
            onClick={signInWithGoogle}>
            Login with Google
          </button>

          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>

          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>  
    </div>
  )
}

export default Login;
