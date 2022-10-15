import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { useCookies } from "react-cookie";
import './navbar.css';
import { MenuOutlined, CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { MenuItems } from './menuItems';


export default function Navbar(props) {
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const showMobileMenu = () => {
    props.setActiveMenu(!props.activeMenu);
  }

  const handleLogout = () => {
    window.location = "/login";
    removeCookie("jwt");
  }

  return (
    <div className="NavBarItems">
      <div className='menu-icon'>
        <MenuOutlined className='menu' onClick={showMobileMenu} />
      </div>
      <nav className={props.activeMenu ? 'slider active' : 'slider'}>
        <span>
          {
            !cookies.jwt ?
              <>
                <Link to="/signup" className='signUp'>Sign Up</Link>
                <Link to="/login" className='login'>Login</Link>
              </>
              :
              <div className='ifLoggedIn'>
                <button onClick={handleLogout} className="logoutbtn">LogOut</button>
                <Link to="/purchases"><ShoppingCartOutlined className='shoppingCartIcon' /></Link>
              </div>

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
