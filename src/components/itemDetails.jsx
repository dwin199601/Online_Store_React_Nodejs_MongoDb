import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { newComment, DeleteComment } from '../util/FetchDataHelper.js';
import LeaveReview from './leaveReview.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteToastMessage } from '../util/FetchDataHelper.js';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router';
import { itemDetailsOpen } from '../util/FetchDataHelper.js';
import { getUserEmail } from '../util/FetchDataHelper';
import { useCookies } from "react-cookie";
import { LoadingOutlined, DeleteOutlined, RightCircleFilled, LeftCircleFilled, DownCircleFilled, UpCircleOutlined, MessageOutlined } from '@ant-design/icons';
import { FetchCommentsFromDb } from '../util/FetchDataHelper.js';
import "./itemDetails.css";

export default function ItemDetails(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [allComments, setAllComments] = useState("");
  const [cookies] = useCookies([]);
  const [isLoading, setLoading] = useState(true);
  const [numOfComments, setNumOfComments] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [displayReviewBox, setDisplayReviewBox] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { param } = useParams();
  const [commentObj, setCommentObj] = useState({
    authorName: `${props.user.fistName} ${props.user.lastName}`,
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

  const leaveComment = async (e) => {
    e.preventDefault();
    if (!commentObj.itemRate || commentObj.itemRate === "Select") {
      deleteToastMessage("You must rate the item before submitting the review!");
    }
    else {
      newComment(commentObj.authorName, commentObj.commentBody, commentObj.itemRate, param, props.user.userId);
      window.location.reload();
    }
  }

  useEffect(() => {
    FetchCommentsFromDb(setAllComments, param, setNumOfComments);
    itemDetailsOpen(props.setItem, setLoading, param, setError);
    if (cookies.jwt) {
      getUserEmail(setUserEmail);
    }
  }, [param]);

  return (
    <div className='updateItem_content' >

      {error && <div>Error: {error}</div>}
      {isLoading ? <LoadingOutlined className="Loadingmessagestyle" /> :
        <div className='itemRiview'>
          <h1 className='itemDetail_h1'>{props.item.item_name}</h1>
          <div className="boxParent">
            <div className='slider-item'>
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
            </div>
            <div className="boxContent">
              <span className='description_item'>
                <h3>Description</h3>
                <p>{props.item.item_description}</p>
              </span>
              <div className='other_Item_Info'>
                <p>Price: ${props.item.price}</p>
                <p>Category: {props.item.category}</p>
                <p>Seller: {props.item.seller_name ? props.item.seller_name : "Unknown"}</p>
              </div>
            </div>
          </div>
          <div className='button_box'>
            <Link to={`/payment/${param}`}>
              <button
                type="button"
                className='buy_item_btn'
              > Buy</button>
            </Link>
          </div>
          <div className='allCommentsBox'>
            <div className='reviewText'>Reviews <span className='numOfComment'>{numOfComments}</span></div>
            <div className='commentsBody'>
              {
                allComments ?
                  allComments
                    .map((data, index) => {
                      return (
                        <div key={index} className="commentContent">
                          <div className='commentDescription'>{data.commentBody}</div>
                          {
                            data.itemRate === "Garbage?" || data.itemRate === "Could be better" ?
                              <h1 className='poorRate'>Rate: {data.itemRate}</h1>
                              :
                              data.itemRate === "Not bad" || "Good" ?
                                <h1 className='goodRate'>Rate: {data.itemRate}</h1>
                                :
                                <h1>Rate {data.itemRate}</h1>

                          }
                          <h2>Author: {data.user_id === props.user.userId ? <span>{data.commentAuthorName} <span className='yoursComment'>You</span> </span> : data.commentAuthorName}</h2>
                          <h3>Date: {data.data_added.slice(0, 10)}</h3>
                          {
                            data.user_id === props.user.userId ?
                              <DeleteOutlined className='deleteComment' onClick={() => DeleteComment(data._id, allComments, setAllComments)} />
                              : ""
                          }
                        </div>
                      )
                    })
                  :
                  <LoadingOutlined className="Loadingmessagestyle" />
              }
            </div>
          </div>

          <div className='reviewBox'>
            <p>Leave Review</p>
            {
              displayReviewBox === false ?
                <DownCircleFilled
                  className='openReviewBox'
                  onClick={() => setDisplayReviewBox(true)}
                />
                :
                <UpCircleOutlined
                  className='closeReviewBox'
                  onClick={() => setDisplayReviewBox(false)}
                />
            }
            <LeaveReview
              leaveComment={leaveComment}
              displayReviewBox={displayReviewBox}
              setDisplayReviewBox={setDisplayReviewBox}
              setCommentObj={setCommentObj}
              commentObj={commentObj}
            />
          </div>

        </div>
      }
    </div>
  )
}
