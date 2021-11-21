import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'


 const ItemList =({item, title}) => {
    return (
        <div className="itemstyles">
            <h1>{title}</h1>
            <table className="table">
           <thead className="table-dark">
       <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th></th>
            </tr>
           </thead>

           <tbody>
            {item.map((allitems)=>(
                <tr key={allitems.id} className="table-success"> 
                <td><img src={allitems.item_image} alt="item_image" className="imagestyles"/></td>
                <td className="NameClasses" title="open product page"><Link to={`/items/${allitems.item_id}`}>{allitems.item_name}</Link></td>
                <td>{allitems.price}</td>
                <td>{allitems.item_description}</td>
                <td><button className="btn btn-danger">Delete</button></td>
                </tr>
            ))}
           </tbody>
           </table>

            
        </div>
    )
}

export default ItemList;

/*<h1>{title}</h1>
            {item.map((allItems)=>(
                <div key={allItems.item_id} className="eachitem">
                <h2>Name: {allItems.item_name}</h2>
                <h3>Price: {allItems.price}</h3>
                <p>Description: {allItems.item_description}</p>
                <br/>
                </div>   

            ))}*/

            // <td>{allitems.item_id}</td>