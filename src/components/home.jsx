import React, { useState } from 'react';
import { VerifyUserHasToken } from '../util/VerifyUser';
import axios from 'axios';
import "./home.css";
import { USER_URL } from '../util/constants';
import { useCookies } from "react-cookie";
import user_Image from "../assets/user_image.jpg";
import { CapturFile, getImageUrl } from '../util/CaptureFileHelper';
import { EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { successfullMessage } from '../util/FetchDataHelper';

function Home(props) {
  VerifyUserHasToken();
  const [userFirstName, setuserFirstName] = useState("")
  const [userLasttName, setuserLastName] = useState("")
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [cookies, removeCookie] = useCookies([]);
  const [openNameUpdate, setOpenNameUpdate] = useState(false);
  const [openLastNameUpdate, setOpenLastNameUpdate] = useState(false);
  const forUser = true;

  /*const getUserData = async () => {
    getUserEmail(setUserEmail);
  }

  useEffect(() => {
    if (cookies.jwt) {
      getUserData();
    }
  }, [cookies.jwt])*/

  const deleteUser = async (e, user_id) => {
    e.preventDefault();
    await axios.delete(`${USER_URL}/${user_id}`);
    if (cookies.jwt) {
      removeCookie("jwt");
      window.location.reload();
    }
  }

  const updateUserData = async (e, user_id, firstName, lastName, imgURL) => {
    e.preventDefault();
    const userImg = await getImageUrl(userImage, forUser);
    console.log(userImg);
    fetch(`${USER_URL}/${user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "firstName": userFirstName === "" ? firstName : userFirstName,
        "lastName": userLasttName === "" ? lastName : userLasttName,
        "image": userImage === null ? imgURL : userImg
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

  return (
    <>
      {
        props.userData.filter((value) => {
          if (value.email === props.userEmail)
            return value
        })
          .map((val) => {
            return (
              <div key={val._id} className="home_container">
                <div className='user_dashboard'>
                  <h1>Dashboard</h1>
                  <div className='imageBox'>
                    <img src={!val.image ? user_Image : val.image} alt="user_img" className='user_profile_img' />
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
                    <p>{val.firstName}</p>
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
                        placeholder={val.firstName}
                        onChange={(e) => setuserFirstName(e.target.value)}
                        onKeyDown={(e) => keyHandler(e)}
                      />

                    </div>
                  </div>
                  <div className='userDetail'>
                    <h3>Last Name</h3>
                    <p>{val.lastName}</p>
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
                        placeholder={val.lastName}
                        onChange={(e) => setuserLastName(e.target.value)}
                        onKeyDown={(e) => keyDownHandler(e)}
                      />
                    </div>
                  </div>
                  <div className='userDetail'>
                    <h3>Email Address</h3>
                    <p>{val.email}</p>
                  </div>
                  <div className='btn_box'>
                    <button onClick={(e) => { deleteUser(e, val._id) }} className="delete_user_btn">Delete</button>
                    <button className="save_user_btn" onClick={(e) => updateUserData(e, val._id, val.firstName, val.lastName, val.image)}>Save</button>
                  </div>

                </div>
                <div className='user_rightSide'>
                  <h2>Hey {val.firstName}! We are happy to see you again!</h2>

                </div>
              </div>

            )

          })
      }
    </>
  )
}

export default Home;




