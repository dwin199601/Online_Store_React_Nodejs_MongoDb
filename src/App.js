import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Items from './components/items';
import Newitems from './components/newitems';
import ItemDetails from './components/itemDetails';
import UpdateItem from './components/updateItem';
import { useEffect, useState } from 'react';
import Signup from './components/signup';
import Login from './components/login';
import { useCookies } from "react-cookie";

function App() {
  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(true);

  return (
    <BrowserRouter>
    <Navbar/>
    <div className="App">
      <div className="content">
      <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/newitems" element={ <Newitems/>} />
          <Route exact path="/items/:param" element= { <ItemDetails item={item} setItem={setItem}/>} />
          <Route exact path="/items" element = {<Items isLoading={isLoading} setLoading={setLoading}/>} />
          <Route exact path="/updateItem/:param" element = { <UpdateItem/>} />
          <Route exact path="/signup" element = { <Signup />} />
          <Route exact path="/login" element = { <Login/>} /> 
		  </Routes>
      </div> 
    </div>
    </BrowserRouter>
   
  );
}

export default App;

