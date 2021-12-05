import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ItemList from './itemList';
import 'bootstrap/dist/css/bootstrap.css';


export default function Items() {
   
    

    const RefresPage =(e)=>{
        e.preventDefault();
        window.location.reload();
    };

   const [item, setItem] = useState();
   const [isLoading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(()=> {
   fetch('http://localhost:5000/api/items')
   .then(res=>{
       if(!res.ok){
           throw Error (`Couldn't fetch the data from the server!`)
       }
       return res.json();
   })
   .then(data=>{//to process data from the json file
       setItem(data);
       setLoading(false);
       setError(null);
   })
   .catch(err=>{
       console.log("Error: " + err);
       setError(err.message + " data from the server! Sorry..");
       setLoading(false);
   })
   }, []);

  

    return (
        <div>
            {error &&
            <div className="Errorstyles"> <p>{error}</p><br/>
            <button onClick={RefresPage} className="btn btn-success">Refresh</button>
             </div>}
           {isLoading && <p className="Loadingmessagestyle">Loading...</p>}
           {item && <ItemList item={item} title= "All items" setItem = {setItem}/>}
        </div>
    )
}
