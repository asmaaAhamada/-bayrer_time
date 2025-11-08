import { configureStore } from '@reduxjs/toolkit'
import sighn_normalReducer from '../Reducer/user/auth/sighnNormal'
import login_normalReducer from "../Reducer/user/auth/login"
import refreshTokenReducer from "../Reducer/user/auth/refresh"
import get_cityReducer from "../Reducer/payere/get_city"
import get_qiblaReducer from "../Reducer/payere/get_qibla"
import remembrancesReducer from "../Reducer/payere/azkar"
export default configureStore({
  reducer: {
    sighn_normal:sighn_normalReducer,
    login_normal:login_normalReducer,
    refreshToken:refreshTokenReducer,
    get_city:get_cityReducer,
    get_qibla:get_qiblaReducer,
    remembrances:remembrancesReducer,
 }
})
