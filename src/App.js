import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Items from './components/items';
import Newitems from './components/newitems';
import ItemDetails from './components/itemDetails';
import UpdateItem from './components/updateItem';
import { useEffect, useState } from 'react';
import { FetchDataFromDB } from './util/FetchDataHelper';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(true);

  
  FetchDataFromDB(setItem, setLoading, item);
  const user = localStorage.getItem("userToken");
  
  useEffect(()=> {
   
  },[])

  return (
    <BrowserRouter>
    <Navbar user={user}/>
    <div className="App">
      <div className="content">
      <Routes>
			  {user && 
          <>
          <Route path="/" exact element={<Home />} />
          <Route path="/newitems" exact element={ <Newitems/>} />
          <Route path="/items/:param" exact element= { <ItemDetails item={item} setItem={setItem}/>} />
          <Route path="/items" exact element = {<Items isLoading={isLoading} setLoading={setLoading}/>} />
          <Route path="/updateItem/:param" exact element = { <UpdateItem/>} />
          </>
        }
          <Route path="/signup" exact element = { <Signup />} />
          <Route path="/login" exact element = { <Login/>} />
          <Route path="/newitems" exact element={<Navigate replace to="/login" />} />
          <Route path="/items/:param" exact element={<Navigate replace to="/login" />} />
          <Route path="/items" exact element={<Navigate replace to="/login" />} />
          <Route path="/updateItem/:param" exact element={<Navigate replace to="/login" />} />
          <Route path="/" exact element={<Navigate replace to="/login" />} />
		  </Routes>
      </div> 
    </div>
    </BrowserRouter>
   
  );
}

export default App;

