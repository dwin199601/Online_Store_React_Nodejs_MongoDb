import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';

export default function Newitems() {

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDesctiption] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
  
    const random = Math.round(Math.random() * 100);

     const handleSubmit = (e)=>{
       e.preventDefault();
       setLoading(true);
        
       //const itemsave = {random,image,name,description, price};
        //console.log(random +" " + image +" " +name +" " +description +" " +price)

            fetch("http://localhost:8000/item", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  
                    "item_image": image,
                    "item_name": name,
                    "item_description": description,
                    "price": price
                }
                )
               
            }).then(()=> {
                console.log("New item added");
                alert("Thank you! Your product was added!");
                history.push('/items')
                setLoading(false);
            }).catch(err=>{
                console.log("Error: " + err);
                setLoading(false);
            })
          
        
        
      

     }

    return (
        <div className="additem">
            <h1>Add New Item </h1>

       <form onSubmit={handleSubmit}>
        
    
       <label>Name</label>
       <input type="text"  
       value={name} placeholder="Enter product name"
       onChange ={(e)=>setName(e.target.value)} 
       required/>

       <label>Price$</label>
       <input type="number" placeholder="999" value={price} 
       onChange = {(e)=>setPrice(e.target.value)}
       required/> 
        <label>Add Image</label>
       <input type="url" placeholder="Add image url" 
       value={image} onChange={(i)=>setImage(i.target.value)}/>
       

       <label>Description</label>
       <textarea required placeholder="Enter product description here"
       value={description}
       onChange={(e)=>setDesctiption(e.target.value)} 
       
       />

       {!loading && <button className="btn btn-success">Add Item
       </button>}

       {loading && <button disabled className="btn btn-success">Adding Item...
       </button>}


       </form>
      </div>
    )
}

