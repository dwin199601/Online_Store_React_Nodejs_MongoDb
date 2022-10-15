import React, { useEffect, useState } from 'react';
import { FetchAllPurchases } from '../util/FetchDataHelper';
import DisplayPurchases from './displayPurchases';
import './purchases.css'

const Purchases = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        FetchAllPurchases(props.setPurchases, props.user.userId, setIsLoading);
    }, []);
    console.log(props.user.userId);
  return (
    <div>
        {
            isLoading?  <h1>Loading</h1> :
            <DisplayPurchases purchases={props.purchases} setPurchases={props.setPurchases}/>
        }
    </div>
    )
}
       
export default Purchases;