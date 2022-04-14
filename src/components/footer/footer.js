import './footer.css';
import {FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footerContent'>
        <div className='leftSideFooter'>
        <FacebookOutlined className='socialMedias'/>
        <InstagramOutlined className='socialMedias'/>
        <TwitterOutlined className='socialMedias'/>
        </div>
        <div className='centerFooter'>
           
        </div>
        <div className='rightSideFooter'>
          <h3>Contact</h3>
          <h4>Email: <Link to="mailto:dwin13672@gmail.com">dwin13672@gmail.com</Link></h4>
          <h4>Phone Number: <Link to="tel:+12368630646">236-863-0646</Link></h4>
        </div>
    </div>
  )
}

export default Footer;
