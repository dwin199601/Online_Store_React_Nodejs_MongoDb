import React, { useState } from 'react';
import { VerifyUserHasToken } from '../util/VerifyUser';
import axios from 'axios';
import "./home.css";
import { USER_URL } from '../util/constants';
import { useCookies } from "react-cookie";
import { FetchDataFromDBWithErrors } from '../util/FetchDataHelper';
import user_Image from "../assets/user_image.jpg";
import UserProducts from './userProducts';
import { CapturFile, getImageUrl } from '../util/CaptureFileHelper';
import { EditOutlined, CloseCircleOutlined, LoadingOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import { successfullMessage } from '../util/FetchDataHelper';


function Home(props) {
  VerifyUserHasToken();
  const [first_Name, setFirstName] = useState("");
  const [last_Name, setLastName] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [cookies, removeCookie] = useCookies([]);
  const [openNameUpdate, setOpenNameUpdate] = useState(false);
  const [openLastNameUpdate, setOpenLastNameUpdate] = useState(false);
  const [onOpenDash, setOnOpenDash] = useState(false);
  const forUser = true;
  FetchDataFromDBWithErrors(props.setProducts, setLoading, props.setError);

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

  const RefresPage = (e) => {
    e.preventDefault();
    window.location.reload();
  };


  return (
    <>
      {
        isLoading ? <LoadingOutlined />
          :
          <div className="home_container">
            <UserOutlined className={onOpenDash === false ? "mobileDash" : "mobileDash hide"} title="open user menu" onClick={() => { setOnOpenDash(true) }} />
            <div className={onOpenDash === false ? 'user_dashboard hide' : 'user_dashboard'}>
              <CloseOutlined className={onOpenDash === true ? "closemenue" : "closemenue hide"} onClick={() => { setOnOpenDash(false) }} />
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
              <UserProducts
                products={props.products}
                user_id={props.user.userId}
              />
            </div>
          </div>

      }
      {props.error &&
        <div className="Errorstyles">
          <p>Sorry, no connection with server, try again..</p>
          <input type="button" value="Reconnect" onClick={RefresPage} className="reconncetbtn" />
        </div>
      }
    </>
  )
}

export default Home;




