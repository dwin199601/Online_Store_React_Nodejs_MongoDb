import React, { useEffect, useState } from 'react';
import { FetchAllPurchases } from '../util/FetchDataHelper';
import DisplayPurchases from './displayPurchases';
import { LoadingOutlined } from '@ant-design/icons';
import './purchases.css'

const Purchases = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    FetchAllPurchases(props.setPurchases, props.user.userId, setIsLoading);
    
  return (
    <div>
        {
            isLoading?  <LoadingOutlined className="Loadingmessagestyle" /> :
            <DisplayPurchases purchases={props.purchases} setPurchases={props.setPurchases}/>
        }
    </div>
    )
}
       
export default Purchases;