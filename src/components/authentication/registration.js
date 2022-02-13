import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
  } from "./firebase";
import './registration.css';
import {CheckIfUserRegistered} from '../../util/UserAuthHelper'
import { loginError } from './firebase';


function Registration() {
    CheckIfUserRegistered('/dashboard');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    

    const register = () => {
      if (name === "") {
        loginError("Please enter your name")
      }
      else if(email === "") {
        loginError("Please enter your email!")
      }
      else if(password ==="") {
        loginError("Please enter your password!")
      }
      else registerWithEmailAndPassword(name, email, password);
    };
    
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          autoComplete="off"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          required 
          maxlength={30}
        />
        <input
          autoComplete="off"
          type="email"
          autoSave='off'
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          required 
          maxlength={40}
        />
        <input
          autoComplete="off"
          autoSave='off'
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required 
          maxlength={30}
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>

      </div>
    </div>
    );
}

export default Registration;
