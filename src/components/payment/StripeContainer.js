import { PUBLISH_KEY } from "../../constants/constants";
import {loadStripe} from "@stripe/stripe-js";
import { Elements} from '@stripe/react-stripe-js';
import PaymentForm from "./PaymentForm";
import { useParams } from 'react-router';
import { itemDetailsOpen } from "../../util/FetchDataHelper";
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { getUserData } from "../../util/VerifyUser";

function StripeContainer(props) {
    const stripePromise = loadStripe(PUBLISH_KEY);
    const { param } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        itemDetailsOpen(props.setItem, setLoading, param, setError);
    }, [param]);


    return (
        <span>
        {
            isLoading === true?
                <LoadingOutlined className="Loadingmessagestyle"/>
            :
            <Elements stripe={stripePromise}>
            <PaymentForm 
                description = {props.item.item_description}
                itemName = {props.item.item_name}
                itemPrice = {props.item.price}
                itemImage= {props.item.item_image}  
                itemId={param}              
                userEmail = {props.userEmail}
                userFirstName={props.user.fistName}
                userLastName={props.user.lastName}
                userId={props.user.userId}
            />
            </Elements>
        }
        </span>
       
    )
}

export default StripeContainer;
