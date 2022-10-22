import React from 'react';
import { MessageFilled, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const DisplayPurchases = (props) => {

    const isHide = true;
    const hideDisplayTitle = (purchaseId, isHide) => {
        let newPurchase = props.purchases.map((items) => {
            if (items._id === purchaseId) {
                if (isHide === true)
                    items.titleDisplay = true;
                else
                    items.titleDisplay = false;
                return items;
            }
            else {
                return items;
            }
        })
        props.setPurchases(newPurchase);
    }

    const purchasesWithId = props.purchases.filter((value) => {
        if (value.recipientId === props.userId)
            return value;
    })

    let numberOfPurch = purchasesWithId.length;

    return (
        <div>
            {numberOfPurch > 0 ?
                purchasesWithId
                    .map((data) => {
                        return (
                            <div key={data._id} className='purchaseBox'>
                                <div className='purchaseTitle'>
                                    {
                                        <Link to={`/items/${data.itemId}`} onMouseEnter={() => hideDisplayTitle(data._id, isHide)} onMouseLeave={() => hideDisplayTitle(data._id)}>
                                            <p className={data.titleDisplay === true ? 'productTitle hide' : 'productTitle'}>{data.itemName.slice(0, 11)}</p>
                                            <p className={data.titleDisplay === false ? 'openProduct' : 'openProduct show'}>See Product</p>
                                        </Link>
                                    }
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
                :
                <div className='noPurchsesBox'>
                    <div className='noPurchaseWindow'>
                        <span>Opps..</span>
                        <span>You didn't buy anything yet</span>
                        <span>Visit out store</span>
                        <Link to={"/items"}>< HomeOutlined className='visitStore' /></Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayPurchases;
