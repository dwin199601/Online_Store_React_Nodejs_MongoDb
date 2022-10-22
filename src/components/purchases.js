import React, { useState } from 'react';
import { FetchAllPurchases } from '../util/FetchDataHelper';
import DisplayPurchases from './displayPurchases';
import { LoadingOutlined } from '@ant-design/icons';
import './purchases.css'

const Purchases = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    FetchAllPurchases(props.setPurchases, setIsLoading);
   
  return (
    <div>
        {
            isLoading?  <LoadingOutlined className="Loadingmessagestyle" /> 
            :
            <DisplayPurchases 
                purchases={props.purchases} 
                setPurchases={props.setPurchases} 
                numOfPurchases={props.numOfPurchases}
                userId = {props.user.userId}
                setNumOfPurchases={props.setNumOfPurchases}
            />
        }
    </div>
    )
}
       
export default Purchases;