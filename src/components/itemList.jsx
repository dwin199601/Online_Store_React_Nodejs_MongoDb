import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoadingOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import './itemList.css'

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

    const openDescription = (id) => {
        let newItems = props.item.map((items) => {
            if (items._id === id) {
                items.visibleDescription = true;
                return items;
            }
            else {
                return items;
            }
        })
        props.setItem(newItems);
    }

    const closeDescription = (id) => {
        let newItems = props.item.map((items) => {
            if (items._id === id) {
                items.visibleDescription = false;
                return items;
            }
            else {
                return items;
            }
        })
        props.setItem(newItems);
    }

    return (
        <>
            <h1>All Items</h1>
            <div className="itemstyles">
                {
                    props.item.map((allitems) => {
                        return (
                            <div key={allitems._id} >
                                <div className='product_content'>
                                    <h1 className='priceItem'>Price ${allitems.price}</h1>
                                    {
                                        allitems.item_image ? <Link to={`/items/${allitems._id}`}> <img src={allitems.item_image} alt="item_image" className="imagestyles" /> </Link>
                                            : <LoadingOutlined style={{ fontSize: 25 }} />
                                    }
                                    <Link to={`/items/${allitems._id}`}>{allitems.item_name}</Link>
                                    <div className='productBtn'>
                                        <Link to={`/updateItem/${allitems._id}`}><button className='edit_btn'>Edit</button></Link>
                                        <button className="delete_btn" onClick={() => handledelete(allitems)}>Delete</button>
                                    </div>
                                    {
                                        allitems.visibleDescription === false ?
                                            <DownCircleOutlined
                                                className='more_content'
                                                onClick={() => openDescription(allitems._id)} />
                                            :
                                            <UpCircleOutlined
                                                className='close_morecontent'
                                                onClick={() => closeDescription(allitems._id)} />
                                    }

                                    <div className={allitems.visibleDescription === true ? "itemDescription" : "hidden"} key={allitems._id}>
                                        <p>{allitems.item_description}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}


export default ItemList;
