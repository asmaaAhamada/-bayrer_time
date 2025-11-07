import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './componenets/auth/login/background'
import SignUp from './componenets/auth/regester/background2'

import HelloPage from './componenets/homePage/helloPage'
import SettingPage from './componenets/linkPage/SettingPage'
import KissPage from './componenets/linkPage/KissPage'
import Layout from './componenets/homePage/Layout'
import RemembranceCard from './componenets/linkPage/Remembrances/Remembrances'
import CustomTabPanel from './componenets/linkPage/Remembrances/tabs'
import NotifyPage from './componenets/linkPage/notifecation'
import NearestMosquePage from './componenets/linkPage/mousqPage'
import ProfilePage from './componenets/linkPage/profile/ProfilePage'
export default function App({ toggleMode, mode }){
  return (
   
     <>
    
    
     
     <Routes>
  {/* <Route path="/" element={<Login />} />
    <Route path="/sighn" element={<SignUp />} /> */}
{/* //////////////token//////////////// */}
     
        <Route path="/" element={<Layout toggleMode={toggleMode} mode={mode}/>}>
          <Route index element={<Navigate to="/Home" replace />} />
          <Route path="Home" element={<HelloPage />} />
          <Route path="Remembrances" element={<CustomTabPanel />} />
          <Route path="Kiss" element={<KissPage />} />
          <Route path="Setting" element={<SettingPage />} />
                    <Route path="notify" element={<NotifyPage />} />
                                        <Route path="mousq" element={<NearestMosquePage />} />


                                                  <Route path="profile" element={<ProfilePage />} />

        </Route>
     
</Routes> 
     </>
  )
}
