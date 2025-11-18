import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { clearUserData, setUserData } from "../../../Reducer/user/userInfo";
import APPLoading from "../../loader/APPLoading";
import { getData } from "../../../Backend/ApiServeces";
// import { setUserData, clearUserData } from "../../reducer/user";
// import Loading from "../../wrong/mails/loading";
// import FORBIDDIN from "./forbiden";
// import APPLoading from "../../wrong/apploading";

const cookies = new Cookies();

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const roles = useSelector((state) => state.user?.roles || []);
  
// جديدة
useEffect(() => {
  const checkSession = async () => {
    setLoading(true);
    try {
      const data = await getData(`http://127.0.0.1:8000/api/check-session`,
        {}
      );
      console.log(data)

     dispatch(
  setUserData({
    name: data.user.name,
        emial: data.user.emial,

  })
);
      
      setAuthorized(true);
    } catch (err) {
      console.log(err);
      dispatch(clearUserData());
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  checkSession();
}, [dispatch]);



  if (loading) return <APPLoading />;
  if (!authorized) return <Navigate to="/login" replace />;
  
  
  return <Outlet />;
}
