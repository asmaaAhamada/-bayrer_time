import { useEffect } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';


export default function Login_Google(){
        const navigate = useNavigate();

   const location=useLocation()

   useEffect(() => {
       console.log(location.pathname)

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");
console.log(token)
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