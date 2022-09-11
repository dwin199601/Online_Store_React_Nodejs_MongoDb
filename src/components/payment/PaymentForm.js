import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import "./PaymentForm.css";
import getCountries from "./countryPayment.json";
import { deleteToastMessage, successfullMessage } from "../../util/FetchDataHelper";
import { newPayment } from '../../util/FetchDataHelper';

function PaymentForm(props) {
    const [success, setSuccess] = useState(false);
    const [values, setValues] = useState({
        phoneNum: "",
        streetName: "",
        suite: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
    });
    const stripe = useStripe();
    const elements = useElements();

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "black",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#109935" },
                "::placeholder": { color: "#1474f2" }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if(values.country === "Select") {
            deleteToastMessage("Select country!");
        }
        else if(!error) {
            try{
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:6050/api/payment", {
                    amount: props.itemPrice* 100,
                    receipt_email: props.userEmail,
                    itemName: props.itemName,
                    itemPrice: props.itemPrice,
                    recipientName: `${props.userFirstName} ${props.userLastName}`,
                    phoneNumber: values.phoneNum,
                    street: values.streetName,
                    suite: values.suite,
                    city: values.city,
                    state: values.state,
                    country: values.country,
                    postalCode: values.postalCode,
                    id: id
                })
                newPayment(props.userFirstName, props.userId, props.itemName, props.itemImage[0], props.itemId, props.itemPrice,  values.streetName, values.suite, values.city, values.state, values.country, values.postalCode);
                if(response.data.success) {
                    successfullMessage("Successfull payment");
                    setSuccess(true);
                }
                else {
                    deleteToastMessage("Opps, something went wrong, are you sure that you provided correct card data?")
                }
            }
            catch(error){
                console.log(error)
            }
        }
        else {
            deleteToastMessage(error.message);
        }
    }

    return (
         <>
        {!success ? 
        <form onSubmit={handleSubmit} className="form_content">
            <h2>Pay For {props.itemName}</h2>
            <h3>Total Price: ${props.itemPrice}</h3>
            <div className='payment_info'>
                <CardElement options={CARD_OPTIONS} className="card_number"/>
                
                <span className='payment_element'>
                    <label htmlFor='phone_Number'>Phone Number</label>
                    <input id="phone_Number" placeholder="+12672309" value={values.phoneNum} onChange={(e) => setValues({ ...values, phoneNum: e.target.value})}/>
                </span>
                <span className='payment_element'>
                    <label htmlFor='user_email'>Recipient Email</label>
                    <input id="user_email" value={!props.userEmail? "loading.." : props.userEmail} disabled/>
                </span>
                <span className='payment_element'>
                    <label htmlFor='street_name'>Streat Name</label>
                    <input id='street_name' placeholder='123 Yukon Ave.' value={values.streetName} onChange={(e) => setValues({...values, streetName: e.target.value})} required/>
                </span>
                <span className='payment_element'>
                    <label htmlFor='unit_num'>Suite/Appartment</label>
                    <input id='unit_num' placeholder='213' value={values.suite} onChange={(e) => setValues({...values, suite: e.target.value})} required/>
                </span>
                <span className='payment_element'>
                    <label htmlFor='city_name'>City</label>
                    <input id='city_name' placeholder='Seattle' value={values.city} onChange={(e) => setValues({...values, city: e.target.value})} required/>
                </span>
                <span className='payment_element'>
                    <label htmlFor='state'>State</label>
                    <input id='state' placeholder='Washington' value={values.state} onChange={(e) => setValues({...values, state: e.target.value})} required/>
                </span>
                <span className='payment_element'>
                    <label htmlFor='country'>Country</label>
                    <select
                     onChange={(e) => setValues({...values, country: e.target.value})}
                     >
                        {
                            getCountries.map((value) => {
                                return (
                                    <option 
                                        key={value.id} 
                                        value={value.country} 
                                        defaultValue="Select"
                                    >
                                        {value.country}
                                    </option>
                                )
                            })
                        }
                    </select>
                </span>
                <span className='payment_element'>
                    <label htmlFor='postal_code'>Postal Code</label>
                    <input id='postal_code' placeholder='98762' value={values.postalCode} onChange={(e) => setValues({...values, postalCode: e.target.value})} required/>
                </span>
               
            </div>
            <button className='pay_btn'>Pay</button>  
        </form>
        :
       <div className='thank-you-content'>
           <h2>Thank you {props.userFirstName}!</h2>
           <p>The receipt will be sent to the email box: {props.userEmail}</p>
           <p>The item will be shipped by {values.streetName} {values.suite} {values.city} {values.state} {values.country} {values.postalCode}</p>
           <h3>NOTE: Make sure that spinning address is correct!</h3>
           <p>If you want to change address, <a href="mailto:dwin13672@gmail.com" className="email_contact">contact</a> us as soon as possible</p>
       </div> 
        }
            
        </>
    )
}

export default PaymentForm;
