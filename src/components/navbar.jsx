import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css';
import { useState } from 'react';
import ReorderIcon from "@material-ui/icons/Reorder";

export default function Navbar(props) {
  const [show, setShow] = useState(false);//its for showing or not showing drop-down menu
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.reload();
  }

  return (
    <div className="NavBar">

      <div className="leftSide">
        {
          props.user ?
            <button onClick={handleLogout} className="logoutbtn">LogOut</button>
            :
            <>
              <Link to="/signup" className='signUp'>Sign Up</Link>
              <Link to="/login" className='login'>Login</Link>
            </>
        }

      </div>

      <div className="rightSide">
        <div className="icons-list">
          <div className="links" id={show
            ? "hidden" : ""}>
            <Link to="/">Home</Link>
            <Link to="/items">Items</Link>
            <Link to="/newitems">New Item</Link>
          </div>
        </div>
        <button onClick={() => setShow(!show)}>
          {" "}
          <ReorderIcon />
        </button>

      </div>

    </div>

  )
}

