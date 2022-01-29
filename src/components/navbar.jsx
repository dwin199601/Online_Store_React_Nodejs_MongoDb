import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import {HomeOutlined } from '@ant-design/icons'
import '../App.css';
import { useState } from 'react';
import ReorderIcon from "@material-ui/icons/Reorder"
import SearchIcon from "@material-ui/icons/Search"

export default function Navbar() {

   const [show, setShow] = useState(false);//its for showing or not showing drop-down menu
   


    return (
       <div className="NavBar">

       <div className="leftSide">
         <input type="text" placeholder='search'/>
         <button><SearchIcon/></button>
       </div>
     
       <div className="rightSide">
         <div  className="icons-list">
         <div className="links" id= {show
           ? "hidden" : ""}>
         <Link to="/"><HomeOutlined className="homeStyle"/></Link>
        <Link to="/items">Items</Link>
        <Link to="/newitems">New Item</Link>
         </div>
         </div>
        <button onClick={()=>setShow(!show)}>
          {" "}
          <ReorderIcon/>
          </button> 

       </div>
       
       </div>
      
    )
}




        /*  <nav className="navbar">
        <h1 className="h1styles">Mini Mart</h1>
        <div className="icons-list">
         <div className="links">
        <Link to="/"><HomeOutlined style={{"font-size": "20px"}}/></Link>
          <Link to="/items">Items</Link>
          <Link to="/newitems" className="newitemstyle" >New Item</Link>
         </div>
         </div> 
        </nav>*/
