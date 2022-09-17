import React, {useRef} from 'react';
import './contactForm.css';
import emailjs from '@emailjs/browser';
import {CloseCircleFilled, LeftSquareFilled  } from '@ant-design/icons';
import { useState } from 'react';
import { successfullMessage } from '../util/FetchDataHelper';
import { Link } from 'react-router-dom';


export default function ContactForm() {
  const form = useRef();
  const [isSentForm, setIsSentForm] = useState(false);
  const [userName, setuserName] = useState("");
  const service_id = process.env.REACT_APP_YOUR_SERVICE_ID;
  const template_id = process.env.REACT_APP_YOUR_TEMPLATE_ID;
  const public_id = process.env.REACT_APP_YOUR_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(`${service_id}`, `${template_id}`, form.current, `${public_id}`)
      .then((result) => {
          successfullMessage("The message was sent successfully!");
          console.log(result);
          setIsSentForm(true);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  }

  return (
    <>
      {
        isSentForm === false?
        <div className='contactPage'>
        <Link to={"/"}><LeftSquareFilled className='goBack'/></Link>
        <form onSubmit={sendEmail} ref={form}>
          <div className="contactFormParent">
            <input type="text" placeholder="Name" name="name" maxLength={65} onChange={(e) => setuserName(e.target.value)} required/>
            <input type="email" placeholder="Email Address" name="email" maxLength={65} required/>
            <input type="text" placeholder="Subject" name="subject" maxLength={65} required/>
            <textarea id="" cols="30" rows="8" placeholder="Your message" name="message" required></textarea>
            <input type="submit" value="Send Message" className='submitBtn'></input>
          </div>
        </form>
        </div>
        :
        <div className='thanksBox'>
          <Link to={"/"}>
            <CloseCircleFilled  className='closeMsg'/> 
          </Link>
          <h1> Thank you {userName}! We received your message and will get in touch soon!</h1>
        </div>
        
      }
      
    </>
  )
}
