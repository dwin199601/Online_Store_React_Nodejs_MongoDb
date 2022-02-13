import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import { auth, sendPasswordResetEmail } from "./firebase";
import './reset.css'
import {CheckIfUserRegistered} from '../../util/UserAuthHelper'

function Reset() {
    const [email, setEmail] = useState("");
    CheckIfUserRegistered('/dashboard');  

  return (
    <div className="reset">
        <div>
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordResetEmail(email)}
        >   Send password reset email</button>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>

    </div>
  )
}


export default Reset;
