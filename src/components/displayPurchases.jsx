import React, { useState } from 'react';
import { MessageFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DisplayPurchases = (props) => {

    const [hideTitle, setHideTitle] = useState(false);

    return (
        <div>
            {
                props.purchases.map((data) => {
                    return (
                        <div key={data._id} className='purchaseBox'>
                            <div className='purchaseTitle'>
                                <Link to={`/items/${data.itemId}`} onMouseEnter={() => setHideTitle(true)} onMouseLeave={() => setHideTitle(false)}>
                                    <p className={hideTitle === true ? 'productTitle hide' : 'productTitle'}>{data.itemName.slice(0, 11)}</p>
                                    <p className={hideTitle === false ? 'openProduct' : 'openProduct show'}>See Product</p>
                                </Link>
                                <img src={data.itemImage} alt={data.itemImage} />
                            </div>
                            <div className='purchaseDescript'>
                                <Link to={"/contact"}
                                    title='contact admin'
                                    className='contactAdmin'
                                >
                                    <MessageFilled />
                                </Link>
                                <p className='paidAmount'>Paid: ${data.paidAmount}</p>
                                <p>Date of Purchase: {data.data_added.slice(0, 10).toUpperCase()}</p>
                                <div>
                                    <p>Shipping Address:</p>
                                    <div className='shipAddress'>{data.suite} Unit/Apartment {data.street} st, {data.city}, {data.state}, {data.country}, {data.postalCode}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayPurchases;
