import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VerifyUserHasToken } from '../util/VerifyUser';
import axios from 'axios';
import Purchases from './purchases';
import "./home.css";
import { USER_URL } from '../util/constants';
import { useCookies } from "react-cookie";
import { FetchAllPurchases } from '../util/FetchDataHelper';
import user_Image from "../assets/user_image.jpg";
import { handledeleteProduct } from '../util/ProductsHelper';
import { FetchDataFromDBWithErrors } from '../util/FetchDataHelper';
import { CapturFile, getImageUrl } from '../util/CaptureFileHelper';
import { EditOutlined, CloseCircleOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import { successfullMessage } from '../util/FetchDataHelper';
import { useEffect } from 'react';

function Home(props) {
  VerifyUserHasToken();
  const [first_Name, setFirstName] = useState("");
  const [purchases, setPurchases] = useState(null);
  const [last_Name, setLastName] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [cookies, removeCookie] = useCookies([]);
  const [openNameUpdate, setOpenNameUpdate] = useState(false);
  const [openLastNameUpdate, setOpenLastNameUpdate] = useState(false);
  const forUser = true;

  const deleteUser = async (e) => {
    e.preventDefault();
    await axios.delete(`${USER_URL}/${props.user.userId}`);
    if (cookies.jwt) {
      removeCookie("jwt");
      window.location.reload();
    }
  }

  const updateUserData = async (e) => {
    e.preventDefault();
    const userImg = await getImageUrl(userImage, forUser);
    console.log(userImg);
    fetch(`${USER_URL}/${props.user.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "firstName": first_Name === "" ? props.user.firstName : first_Name,
        "lastName": last_Name === "" ? props.user.lastName : last_Name,
        "image": userImage === null ? props.user.userImage : userImg
      })
    })
      .then(response => {
        window.location.reload();
        return response.json();
      })
      .catch(err => {
        console.log(err);
      })
  }

  const onImageChange = (e) => {
    CapturFile(e, setUserImage, forUser);
    setIsUserUpdated(true);
  }

  const keyHandler = (e) => {
    if (e.keyCode === 13) {
      setOpenNameUpdate(false)
    }
  }

  const keyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setOpenLastNameUpdate(false)
    }
  }
  FetchDataFromDBWithErrors(props.setProducts, setLoading, props.setError);

  useEffect(() => {
    FetchAllPurchases(setPurchases, setLoading);
  }, []);

  return (
    <>
      {
        <div className="home_container">
          <div className='user_dashboard'>
            <h1>Dashboard</h1>
            <div className='imageBox'>
              <img src={!props.user.userImage ? user_Image : props.user.userImage} alt="user_img" className='user_profile_img' />
            </div>
            <div className='update'>
              {
                isUserUpdated === true ? "" : <input type="file" className='update_imgbtn' onChange={(e) => onImageChange(e)} />
              }
              {
                isUserUpdated === true ?
                  <div className='uploadeduser_img' onClick={() => { successfullMessage("Image is already uploaded!") }}>Uploaded!</div>
                  : <div className='update_icon'>Add Image</div>
              }

            </div>
            <div className='userDetail'>
              <h3>First Name</h3>
              <p>{props.user.fistName}</p>
              <div className='updateName'>
                {
                  openNameUpdate === false ?
                    <EditOutlined style={{ fontSize: 25, cursor: 'pointer', marginBottom: "5px" }} title="Edit First Name" onClick={() => setOpenNameUpdate(true)} />
                    :
                    <CloseCircleOutlined style={{ fontSize: 25, cursor: 'pointer', marginBottom: "5px" }} title="Close" onClick={() => setOpenNameUpdate(false)} />
                }
                <input
                  type="text"
                  className={openNameUpdate === false ? "hideInputUpdate" : "inputUpdateName"}
                  placeholder={props.user.fistName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyDown={(e) => keyHandler(e)}
                />

              </div>
            </div>
            <div className='userDetail'>
              <h3>Last Name</h3>
              <p>{props.user.lastName}</p>
              <div className='updateLastName'>
                {
                  openLastNameUpdate === false ?
                    <EditOutlined style={{ fontSize: 25, cursor: 'pointer' }} title="Edit Last Name" onClick={() => setOpenLastNameUpdate(true)} />
                    :
                    <CloseCircleOutlined style={{ fontSize: 25, cursor: 'pointer', marginBottom: "5px" }} title="Close" onClick={() => setOpenLastNameUpdate(false)} />
                }
                <input
                  type="text"
                  className={openLastNameUpdate === false ? "hideInputUpdate" : "updateLastNameInput"}
                  placeholder={props.user.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyDown={(e) => keyDownHandler(e)}
                />
              </div>
            </div>
            <div className='userDetail'>
              <h3>Email Address</h3>
              <p>{props.userEmail}</p>
            </div>
            <div className='btn_box'>
              <button onClick={(e) => { deleteUser(e) }} className="delete_user_btn">Delete</button>
              <button className="save_user_btn" onClick={(e) => updateUserData(e)}>Save</button>
            </div>

          </div>
          <div className='user_rightSide'>
            <h2 className='wellcomeMsg'>Hey {props.user.fistName}! We are happy to see you again!</h2>
            <div className='rightSideConten'>
              <p>Your Products</p>
              <div className='user_products'>
                {
                  props.products.filter((userProduct) => {
                    if (userProduct.user_id === props.user.userId)
                      return userProduct;

                  })
                    .map((allproducts) => {
                      return (
                        <div key={allproducts._id} className='productBox'>
                          <h1>Title: <span className='productName' title={allproducts.item_name}>{allproducts.item_name.slice(0, 15).toUpperCase()}..</span></h1>
                          {
                            allproducts.item_image ?
                              <img src={allproducts.item_image[0]} />
                              :
                              <LoadingOutlined />
                          }
                          <h3 className='productPrice'>${allproducts.price}</h3>
                          <h4>Added date: {allproducts.data_added.slice(0, 10)}</h4>
                          <div className='productListBtn'>
                            <Link to={`/updateItem/${allproducts._id}`} className='editLink'>
                              <EditOutlined className='editProducBtn' title='edit product' />
                            </Link>
                            <DeleteOutlined className='deleteProductBtn' title='delete product' onClick={() => { handledeleteProduct(allproducts, props.setProducts, props.products) }} />
                          </div>
                        </div>
                      )
                    })
                }
              </div>
            </div>
            {
              purchases ?
                <>
                  <h1 className='boughProducts'>Bought Products</h1>
                  <Purchases allpurchases={purchases} userId={props.user.userId} />
                </>
                :
                ""
            }
          </div>
        </div>
      }
    </>
  )
}

export default Home;




