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