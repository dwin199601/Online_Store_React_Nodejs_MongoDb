import React from 'react';
import './purchases.css';
import {MessageFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Purchases = (props) => {
  return (
    <div className='purchaseParent'>
        {
            props.allpurchases.filter((purchases) => {
                if(purchases.recipientId ===props.userId)
                return purchases;
            })
            .map((data) => {
                return (
                    <div key={data._id} className='purchaseChild'>
                        {/*NOT COMPLITED*/}
                        <Link to={""} 
                            className="contactAdmin" 
                            title='contact admin/DEMO'
                        >
                            <MessageFilled /> 
                        </Link>
                        <Link to={`/items/${data.itemId}`}><p className='productTitle'>{data.itemName}</p></Link>
                        <img src={data.itemImage} alt={data.itemImage}/>
                        <p className='paidAmount'>Paid: ${data.paidAmount}</p>
                        <p className='purchaseDate'>Date of Purchase: {data.data_added.slice(0, 16).toUpperCase()}</p>
                        <div className='shipAddress'>
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
export default Purchases;
