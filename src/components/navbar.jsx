import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { HomeOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
import '../App.css';
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './authentication/firebase';
import ReorderIcon from "@material-ui/icons/Reorder"

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [show, setShow] = useState(false);//its for showing or not showing drop-down menu

  return (
    <div className="NavBar">

      <div className="leftSide">
        {
          !user ? <Link to="/login"><LoginOutlined className='userLoginIcon' /></Link>
            : <Link to="/login"><UserOutlined className='userLoginIcon' /></Link>
        }
      </div>

      <div className="rightSide">
        <div className="icons-list">
          <div className="links" id={show
            ? "hidden" : ""}>
            <Link to="/"><HomeOutlined className="homeStyle" /></Link>
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

