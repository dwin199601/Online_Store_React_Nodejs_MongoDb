import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Items from './components/items';
import Newitems from './components/newitems';
import ItemDetails from './components/itemDetails';
import UpdateItem from './components/updateItem';
import { useState } from 'react'
import { useEffect } from 'react'





function App() {


  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
   fetch('http://localhost:5000/api/items')
   .then(res=>{
       if(!res.ok){
           throw Error (`Couldn't fetch the data from the server!`)
       }
       console.log("Server works!!")
       return res.json();
      
   })
   .then(data=>{//to process data from the json file
       setItem(data);
       console.log(item)
       setLoading(false);
       
   })
   .catch(err=>{
       console.log("Error: " + err);
       setLoading(false);
   })
   }, []);

   

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

                                    />} />

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

