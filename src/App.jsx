import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './componenets/auth/login/background'
import SignUp from './componenets/auth/regester/background2'

import HelloPage from './componenets/homePage/helloPage'
import SettingPage from './componenets/linkPage/SettingPage'
import KissPage from './componenets/linkPage/KissPage'
import Layout from './componenets/homePage/Layout'
import CustomTabPanel from './componenets/linkPage/Remembrances/tabs'
import NotifyPage from './componenets/linkPage/notifecation'
import ProfilePage from './componenets/linkPage/profile/ProfilePage'
import WelcomePage from './componenets/welcomPage'
import ProtectedRoute from './componenets/auth/protected/ProtectedRoute'
import Hijri_DatePage from './componenets/linkPage/hjgri_date'
import Login_Google from './Reducer/user/auth/google/redirect'
import AudiosPage from './componenets/linkPage/AnashedPage'
export default function App({ toggleMode, mode }){
  return (
   
     <>
    
     
     <Routes>
  <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/google/callback" element={<Login_Google />} />

    <Route path="/sighn" element={<SignUp />} />
{/* //////////////token//////////////// */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Layout toggleMode={toggleMode} mode={mode}/>}>
<Route index element={<WelcomePage />} />
          <Route path="/app/Home" element={<HelloPage />} />
          <Route path="/app/Remembrances" element={<CustomTabPanel />} />
          <Route path="/app/Kiss" element={<KissPage />} />
          <Route path="/app/Setting" element={<SettingPage />} />
                    <Route path="/app/notify" element={<NotifyPage />} />
                                        <Route path="/app/mousq" element={<Hijri_DatePage />} />
                                                                                <Route path="/app/Anashed" element={<AudiosPage />} />


                                                  <Route path="/app/profile" element={<ProfilePage />} />
</Route>
        </Route>
     
</Routes> 
     </>
  )
}
