import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { exportAsImage } from './util/ExportAsImage';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Items from './components/items';
import Newitems from './components/newitems';
import ItemDetails from './components/itemDetails';
import UpdateItem from './components/updateItem';
import { useState } from 'react';
import { FetchDataFromDB } from './util/FetchDataHelper';
import Login from './components/authentication/login';
import Registration from './components/authentication/registration';
import Reset from './components/authentication/reset';
import Dashboard from './components/authentication/dashboard';



function App() {
  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(true);
  FetchDataFromDB(setItem, setLoading, item);
  const exportRef = useRef();

  /*const prtScPressed = useCallback((ev) => {
    if (ev.keyCode === 44) {
      console.log("Print Screen Button was pressed");
      return exportAsImage(exportRef.current, "textImage");
    }
  }, [])*/

  
  return (
    <div ref={exportRef}>
    <Router>
    <div className="App">
    <Navbar/>
      <div className="content">
       <Switch>       
        <Route path="/newitems" >
          <Newitems/>
        </Route>
        <Route path="/items/:param" >
         <ItemDetails item={item} setItem={setItem}/>
        </Route>
        <Route path="/items" >
          <Items isLoading={isLoading} setLoading={setLoading}/>
        </Route>
         
        <Route path="/updateItem/:param">
          <UpdateItem item={item} setItem={setItem}/>
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Registration/>
        </Route>

        <Route path="/reset">
          <Reset/>
        </Route>

        <Route path="/dashboard">
          <Dashboard/>
        </Route>

        <Route exact path="/"  render={()=> <Home/>} 
        />
        
        </Switch>
        </div> 
    </div>
    </Router>
    </div>
  );
}

export default App;

