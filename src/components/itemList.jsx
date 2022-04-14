import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import { LoadingOutlined, DownCircleOutlined, UpCircleOutlined, SearchOutlined } from '@ant-design/icons';
import './itemList.css';
import { deleteToastMessage } from '../util/FetchDataHelper';

const ItemList = (props) => {
    const [search, setSearch] = useState("");

    const handledelete = async (allitems) => {
        console.log("Item was deleted");
        deleteToastMessage("Item was deleted");
        const { data } = await axios.delete("http://localhost:6050/api/items/"
            + allitems._id);

        const newItems = props.item.filter(it => it._id !== allitems._id);
        console.log(data, newItems);
        props.setItem([...newItems]);

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
        <div className='itemContent'>
            <div className='searchBar'>
                <input
                    type="text"
                    placeholder='Item Name'
                    className='find_item'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <SearchOutlined className={search ? "searchWithmessage" : "search_icon"} />
            </div>

            <div className="itemstyles">
                {
                    props.item.filter((titleValue) => {
                        let searchElement = search.replace(/ /g, "").toLowerCase();
                        if (searchElement === "") {
                            return titleValue;
                        }
                        else if (`${titleValue.item_name}`.replace(/ /g, "").toLowerCase().includes(searchElement)) {
                            return titleValue;
                        }
                    })
                        .map((allitems) => {
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
                                            <div className='itemCategory'>
                                                <p>{allitems.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}


export default ItemList;
