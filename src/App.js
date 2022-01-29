import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Items from './components/items';
import Newitems from './components/newitems';
import ItemDetails from './components/itemDetails';
import UpdateItem from './components/updateItem';
import { useState } from 'react';
import { FetchDataFromDB } from './util/FetchDataHelper';


function App() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  FetchDataFromDB(setItem, setLoading, item);
  
  return (
    <Router>
    <div className="App">
    <Navbar/>
      <div className="content">
       <Switch>

       <Route exact path="/"  render={()=> <Home 
                                              item = {item} 
                                              setLoading = {setLoading}
                                              loading={loading}
                                              />} 
        />
        <Route path="/newitems" >
          <Newitems/>
        </Route>
        <Route path="/items/:param">
         <ItemDetails/>
        </Route>
        <Route path="/items" >
          <Items />
        </Route>
         
        <Route path="/updateItem/:param">
          <UpdateItem/>
        </Route>
        </Switch>
        </div> 
    </div>
    </Router>
  );
}

export default App;

