import './footer.css';
import {FacebookOutlined, InstagramOutlined, TwitterOutlined, MailOutlined  } from '@ant-design/icons';
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
          <div className='contactUsBox'>
          <Link to={"/contact"}><MailOutlined className='emailIcon'/></Link>
          </div>
        </div>
    </div>
  )
}

export default Footer;
