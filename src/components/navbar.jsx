import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'


export default function Navbar() {
    return (
        <nav className="navbar">
        <h1 className="h1styles">Mini Mart</h1>

         <div className="links">
          <Link to="/">Home</Link>
          <Link to="/items">Items</Link>
          <Link to="/newitems" className="newitemstyle" >New Item</Link>
         </div>
        </nav>
      
    )
}




        /*  <nav class="navbar navbar-expand-lg navbar-dark bg-dark m-2" >
       
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/items">Items</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/newitems">New Item</a>
            </li>
            
          </ul>
        </div>
      </nav>*/
