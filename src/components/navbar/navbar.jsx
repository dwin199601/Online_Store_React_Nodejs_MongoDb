import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { useCookies } from "react-cookie";
import './navbar.css';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { MenuItems } from './menuItems';


export default function Navbar(props) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [active, setActive] = useState(false);

  const showMobileMenu = () => {
    setActive(!active);
  }

  const handleLogout = () => {
    removeCookie("jwt");
    window.location = "/login";
  }

  return (
    <div className="NavBarItems">
      <div className='menu-icon'>
        <MenuOutlined className='menu' onClick={showMobileMenu} />
      </div>
      <nav className={active ? 'slider active' : 'slider'}>
        <span>
          {
            !cookies.jwt ?
              <>
                <Link to="/signup" className='signUp'>Sign Up</Link>
                <Link to="/login" className='login'>Login</Link>
              </>
              :
              <button onClick={handleLogout} className="logoutbtn">LogOut</button>
          }
        </span>
        <ul>
          <div className='closed'>
            <CloseOutlined className='close' onClick={showMobileMenu} />
          </div>
          {
            MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.url}>
                    {item.name}
                  </Link>
                </li>
              )
            })
          }

        </ul>
      </nav>
    </div>

  )
}


/* <div className='navLeft'>
        {
          !cookies.jwt ?
            <>
              <Link to="/signup" className='signUp'>Sign Up</Link>
              <Link to="/login" className='login'>Login</Link>
            </>
            :
            <button onClick={handleLogout} className="logoutbtn">LogOut</button>
        }
      </div>
      <div className='menu-icon'>
        {
          clicked === false ?
            <MenuOutlined onClick={() => { setClicked(true) }} className="mobMenuIcon" />
            :
            <CloseOutlined onClick={() => { setClicked(false) }} className="mobMenuIcon close" />
        }
      </div>
      <ul className={clicked ? 'mobMenu' : 'navMenu'}>
        {
          MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.className} to={item.url}>
                  {item.name}
                </Link>
              </li>
            )
          })
        }
      </ul>*/

