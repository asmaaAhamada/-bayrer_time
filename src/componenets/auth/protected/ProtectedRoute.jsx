import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../../../Reducer/user/auth/refresh";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  const cookies = new Cookies();
  const token = cookies.get("access_token"); 
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.refreshToken); // عدل الاسم حسب Slice
  const [checkedToken, setCheckedToken] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        try {
          // استدعاء الريفرش توكن
          await dispatch(refreshToken()).unwrap();
        } catch (err) {
          console.error("فشل تجديد التوكن:", err);
        }
      }
      setCheckedToken(true); // انتهينا من محاولة الريفرش
    };

    checkToken();
  }, [token, dispatch]);

  if (!checkedToken || isLoading) {
    // عرض مؤقت أثناء تحميل الريفرش
    return <div>جارٍ التحقق من التوكن...</div>;
  }

  if (!token && error) {
    // إذا بعد محاولة الريفرش لا يوجد توكن
    return <Navigate to={redirectPath} replace />;
  }

  // إذا فيه توكن، اعرض المسارات الداخلية
  return <Outlet />;
};

export default ProtectedRoute;
