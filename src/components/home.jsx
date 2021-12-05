import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';


export default function Home(props) {

    const {item, setLoading, loading} = props;
    console.log("Item ID" + item.item_name);

  
    

    return (
        <div className="container px-4">
        <h1>All Available Items </h1>
        {loading && <div>Loading..</div>}
        {item.map((allitems)=>( 
            <div className="row gx-5" key={allitems._id}>
            <div className="col">
             <div className="p-3 border bg-light"><p>Item Name: {allitems.item_name} </p>
             <img src={allitems.item_image} alt="item_image" className="imagestyles"/>
           
             </div>
            
            </div>
          </div>
        ))}
          
        </div>
      
    )
}



/*  <div>
       
        <h1>All Available Items</h1>
        {loading && <div>Loading..</div>}
        {item.map((allitems)=>(
          <div key={allitems._id}>
          <p>Item Name: {allitems.item_name} </p>
          <img src={allitems.item_image} alt="item_image" className="imagestyles"/>
          </div>
        ))}
        

        </div>*/
