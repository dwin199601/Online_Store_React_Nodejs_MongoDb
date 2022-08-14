import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';


 const verifyUser = async (cookies, removeCookie, navigate) => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
      const { data } = await axios.post(
        "http://localhost:6050",
        {},
        {
          withCredentials: true,
        }
      );
      if (!data.status) {
        removeCookie("jwt");
        navigate("/login");
      }
    }
};

export const VerifyUserHasToken = async () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);

    useEffect(()=> {
        verifyUser(cookies, removeCookie, navigate)
    },[cookies, navigate, removeCookie])
}

export const getUserData = (userData, userEmail, setUserId, setFullName, userDataComments) => {
  userData.filter((val) => {
      if(val.email === userEmail)
      return val;
  }).map((data) => {
      setUserId(data._id);
      if(userDataComments){ // if we need to get user data for comment section in itemDetail, then we go with this one
        setFullName({authorName: `${data.firstName} ${data.lastName}`});
      }
      else {
        if(setFullName){
        setFullName({firstName: data.firstName, lastName: data.lastName});
        }
      }
  })
}