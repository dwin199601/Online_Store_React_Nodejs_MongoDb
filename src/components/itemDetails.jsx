import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { newComment } from '../util/FetchDataHelper.js';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteToastMessage } from '../util/FetchDataHelper.js';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router';
import { itemDetailsOpen } from '../util/FetchDataHelper.js';
import { LoadingOutlined } from '@ant-design/icons';
import { getUserEmail } from '../util/FetchDataHelper';
import { useCookies } from "react-cookie";
import { RightCircleFilled, LeftCircleFilled } from '@ant-design/icons';
import { getUserData } from '../util/VerifyUser.js';
import { FetchCommentsFromDb } from '../util/FetchDataHelper.js';
import "./itemDetails.css";
import productRate from '../data/productRate.json';

export default function ItemDetails(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [allComments, setAllComments] = useState("");
  //const itemPrice = (props.item.price + ITEM_FEE) * 100;
  const [cookies] = useCookies([]);
  const [isLoading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { param } = useParams();
  const [userId, setUserId] = useState(null);
  const userDataComments = true;
  const [commentObj, setCommentObj] = useState({
    authorName: "",
    commentBody: "",
    itemRate: ""
  });
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

  const leaveComment = async (e) => {
    e.preventDefault();
    if (!commentObj.itemRate) {
      deleteToastMessage("You must rate the item before submitting the review!");
    }
    else {
      newComment(commentObj.authorName, commentObj.commentBody, commentObj.itemRate, param);
      window.location.reload();
    }
  }

  useEffect(() => {
    getUserData(props.userData, props.userEmail, setCommentObj, setUserId, userDataComments);
    FetchCommentsFromDb(setAllComments, setLoading);
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
                props.item.item_image ?
                  props.item.item_image.length > 1 ?
                    <>
                      <LeftCircleFilled className="left-arrow" onClick={prevSlide} />
                      <RightCircleFilled className='right-arrow' onClick={nextSlide} />
                    </>
                    : ""
                  :
                  ""
              }
              {
                props.item.item_image ?
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
                  :
                  ""
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
          <div className='allCommentsBox'>
            <span>Reviews </span>
            <div className='commentsBody'>
              {
                allComments ?
                  allComments
                    .filter((value) => {
                      if (value.item_id === param)
                        return value;
                    })
                    .map((data, index) => {
                      return (
                        <div key={index} className="commentContent">
                          <p>{data.commentBody}</p>
                          <h2>Author: {data.commentAuthorName}</h2>
                          <h3>Date: {data.data_added.slice(0, 10)}</h3>
                        </div>
                      )
                    })
                  :
                  <LoadingOutlined className="Loadingmessagestyle" />
              }
            </div>
          </div>
          <div className='comment-section'>
            <form onSubmit={leaveComment}>
              <legend>Leave review</legend>
              <div>
                <label>Your Name</label>
                <input
                  maxLength={30}
                  className='comment-name'
                  type="text"
                  required
                  value={commentObj.authorName}
                  onChange={(e) => setCommentObj({ ...commentObj, authorName: e.target.value })}
                />
              </div>
              <div>
                <label>Comment</label>
                <TextareaAutosize
                  required
                  maxLength={100}
                  rows={1}
                  maxRows={3}
                  value={commentObj.commentBody}
                  onChange={(e) => setCommentObj({ ...commentObj, commentBody: e.target.value })}
                />
              </div>
              <div>
                <label>How would you rate the item</label>
                <select onChange={(e) => setCommentObj({ ...commentObj, itemRate: e.target.value })}>
                  {
                    productRate.map((value) => {
                      return (
                        <option
                          key={value.id}
                        >
                          {value.rate}
                        </option>
                      )
                    })
                  }
                </select>
              </div>
              <div>
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>

      }
    </div>
  )
}
