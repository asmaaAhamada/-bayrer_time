import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import DrawerAppBar from './navBar';
import Cookies from "universal-cookie";
import { useEffect } from 'react';

export default function Layout({ toggleMode, mode }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(() => {
    const token = params.get('token');

    if (token) {
      // خزّنه بالكوكيز
      cookies.set('access_token', token, {
        path: '/',        // متاح بكل الصفحات
        maxAge: 3600,     
        sameSite: 'Lax',  
      });

      navigate('/app', { replace: true });
    }
  }, [params, navigate, cookies]);
  return (
    <>
      <DrawerAppBar toggleMode={toggleMode} mode={mode} />
      <Outlet /> 
    </>
  );
}
