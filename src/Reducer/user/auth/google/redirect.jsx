import { useEffect } from "react";
import { getData } from "../../../../Backend/ApiServeces";
import { BaseUrl, LOGIN_GOOGLE } from "../../../../Backend/Api";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Layout from "../../../../componenets/homePage/Layout";
import WelcomePage from "../../../../componenets/welcomPage";
import HelloPage from "../../../../componenets/homePage/helloPage";
import KissPage from "../../../../componenets/linkPage/KissPage";
import SettingPage from "../../../../componenets/linkPage/SettingPage";
import NotifyPage from "../../../../componenets/linkPage/notifecation";
import Hijri_DatePage from "../../../../componenets/linkPage/hjgri_date";
import ProfilePage from "../../../../componenets/linkPage/profile/ProfilePage";
import axios from "axios";

export default function Login_Google(){
        const navigate = useNavigate();

   const location=useLocation()
   useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");

  if (token) {
    const cookies = new Cookies();
    cookies.set('access_token', token, {
      path: '/',
      maxAge: 86400,
    });
    navigate("/app");
  }
}, [location.search]);

    return(
         
  <></>
    )
  
}