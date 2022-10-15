import React from 'react';
import { MessageFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DisplayPurchases = (props) => {

    return (
        <div>
            {
                props.purchases.map((data) => {
                    return (
                        <div key={data._id} className='purchaseBox'>
                            <div className='purchaseTitle'>
                                <Link to={`/items/${data.itemId}`}><p className='productTitle'>{data.itemName}</p></Link>
                                <img src={data.itemImage} alt={data.itemImage} />
                            </div>
                            <Link to={"/contact"}
                                title='contact admin'
                                className='contactAdmin'
                            >
                                <MessageFilled />
                            </Link>
                            <p>Paid: ${data.paidAmount}</p>
                            <p>Date of Purchase: {data.data_added.slice(0, 16).toUpperCase()}</p>
                            <div>
                                <h3>Shipping Address:</h3>
                                <p>{data.suite} Unit/Apartment {data.street} st, {data.city}, {data.state}, {data.country}, {data.postalCode}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayPurchases;
