import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Items from './components/items';
import Newitems from './components/newitems';
import ItemDetails from './components/itemDetails';

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>
      <div className="content">
       <Switch>

       <Route exact path="/">
        <Home/>
        </Route>

        <Route path="/newitems">
          <Newitems/>
        </Route>

        <Route path="/items/:param">
         <ItemDetails/>
        </Route>
        
        <Route path="/items">
          <Items/>
        </Route>

      

       

       

        </Switch>
        </div> 
    </div>
    </Router>
  );
}

export default App;

