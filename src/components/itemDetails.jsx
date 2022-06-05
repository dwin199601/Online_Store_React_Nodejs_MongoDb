import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'
import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router';
import { itemDetailsOpen } from '../util/FetchDataHelper.js';
import { ITEM_FEE } from '../constants/constants';
import { LoadingOutlined } from '@ant-design/icons';
import { getUserEmail } from '../util/FetchDataHelper';
import { useCookies } from "react-cookie";
import { RightCircleFilled, LeftCircleFilled } from '@ant-design/icons';
import "./itemDetails.css";

export default function ItemDetails(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const itemPrice = (props.item.price + ITEM_FEE) * 100;
  const [cookies] = useCookies([]);
  const [isLoading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { param } = useParams();
  let imgArraylength;

  const nextSlide = () => {
    setCurrentImage(currentImage === imgArraylength - 1 ? 0 : currentImage + 1);
  }
  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? imgArraylength - 1 : currentImage - 1);
  }
  const getImgArrayLength = () => {
    if (!Array.isArray(props.item.item_image) || props.item.item_image.length <= 0) {
      imgArraylength = null;
    }
    else {
      imgArraylength = props.item.item_image.length;
    }
    return imgArraylength;
  }
  getImgArrayLength();

  const deleteHandler = async (items) => {
    try {
      items._id = param;
      console.log("Item was deleted");
      const { data } = await axios.delete("http://localhost:6050/api/items/" + items._id);
      const newItem = props.item.filter(i => i._id !== items._id);
      console.log(data, newItem);
      props.setItem([...newItem]);
      alert("Item was deleted!!")
    }
    catch (error) {
      console.log(error);
      navigate('/items');
      setLoading(false);
    }
  }

  useEffect(() => {
    itemDetailsOpen(props.setItem, setLoading, param, setError);
    if (cookies.jwt) {
      getUserEmail(setUserEmail);
    }
  }, [param]);

  return (
    <div className='updateItem_content'>
      {error && <div>Error: {error}</div>}
      {isLoading ? <LoadingOutlined className="Loadingmessagestyle" /> :
        <div className='itemRiview'>
          <h1 className='itemDetail_h1'>{props.item.item_name}</h1>
          <div className="boxParent">
            <section className='slider-item'>
              {
                props.item.item_image.length > 1 ?
                  <>
                    <LeftCircleFilled className="left-arrow" onClick={prevSlide} />
                    <RightCircleFilled className='right-arrow' onClick={nextSlide} />
                  </>
                  : ""
              }

              {
                props.item.item_image.map((images, index) => {
                  return (
                    <div
                      key={index}
                      className={index === currentImage ? 'slide active' : 'slide'}
                    >
                      {
                        index === currentImage && (<img src={images} alt={`${props.item.item_name} image`} />)
                      }
                    </div>
                  )
                })
              }
            </section>
            <div className="boxContent">
              <span className='description_item'>
                <h3>Description</h3>
                <p>{props.item.item_description}</p>
              </span>
              <p className='price_item'>Price: ${props.item.price}</p>
              <p className='category_item'>Category: {props.item.category}</p>
            </div>
          </div>
          <div className='button_box'>
            <Link to={`/payment/${param}`}>
              <button
                type="button"
                className='buy_item_btn'
              > Buy</button>
            </Link>
            <button
              type="button"
              className='delete_item_btn'
              onClick={deleteHandler}
            >
              Delete Item
            </button>
          </div>
        </div>
      }
    </div>
  )
}
