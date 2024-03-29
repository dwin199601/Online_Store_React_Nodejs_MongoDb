import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { LoadingOutlined, DownCircleOutlined, UpCircleOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './itemList.css';
import { handledeleteProduct } from '../util/ProductsHelper';

const ItemList = (props) => {
    const [search, setSearch] = useState("");
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
                                        {allitems.seller_name ?
                                            <h2 className='sellerName'>Seller: {allitems.seller_name}</h2>
                                            :
                                            ""
                                        }
                                        {
                                            allitems.item_image ?
                                                <Link to={`/items/${allitems._id}`}>

                                                    <img src={allitems.item_image[0]} alt="item_image" className="imagestyles" />
                                                </Link>
                                                : <LoadingOutlined style={{ fontSize: 25 }} />
                                        }
                                        <Link to={`/items/${allitems._id}`}>{allitems.item_name}</Link>
                                        { // the edit and delete buttons are displayed only if user id = item.userId
                                            props.userId === allitems.user_id ?
                                                <div className="productBtn">
                                                    <Link to={`/updateItem/${allitems._id}`} className='editLink'>
                                                        <EditOutlined className='edit_btn' />
                                                    </Link>
                                                    <DeleteOutlined
                                                        className="delete_btn"
                                                        onClick={() => handledeleteProduct(allitems, props.setItem, props.item)}
                                                    />
                                                </div>
                                                : ""
                                        }

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
