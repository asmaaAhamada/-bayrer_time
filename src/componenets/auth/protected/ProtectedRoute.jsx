import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  const cookies = new Cookies();
  const token = cookies.get("access_token"); // أو localStorage.getItem("access_token")

  if (!token) {
    // إذا ما فيه توكن، حوله لصفحة البداية أو تسجيل الدخول
    return <Navigate to={redirectPath} replace />;
  }

  // إذا فيه توكن، اعرض المسارات الداخلية
  return <Outlet />;
};

export default ProtectedRoute;
