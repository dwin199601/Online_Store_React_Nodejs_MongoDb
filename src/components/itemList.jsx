import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();
const ItemList = (props) => {

    const deleteToastMessage = () => {
        toast.error("Item was deleted!", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    }
    const handledelete = async (allitems) => {
        console.log("Item was deleted");
        const { data } = await axios.delete("http://localhost:5000/api/items/"
            + allitems._id);

        const newItems = props.item.filter(it => it._id !== allitems._id);
        console.log(data, newItems);
        props.setItem([...newItems]);
        deleteToastMessage();
    }

    return (
        <div className="itemstyles">
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>

                    </tr>
                </thead>

                <tbody>
                    {props.item.map((allitems) => {
                        return (
                            <tr key={allitems._id} className="table-success">
                                <td><img src={allitems.item_image} alt="item_image" className="imagestyles" /></td>
                                <td className="NameClasses" title="open product page"><Link to={`/items/${allitems._id}`}>{allitems.item_name}</Link></td>
                                <td>$ {allitems.price}</td>
                                <td>{allitems.item_description}</td>
                                <td><button onClick={() => handledelete(allitems)} className="btn btn-danger">Delete</button></td>
                                <td><Link to={`/updateItem/${allitems._id}`}><button type="button" className="btn btn-warning" style={{ width: "70px" }}>Edit</button></Link></td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>
    )
}


export default ItemList;
