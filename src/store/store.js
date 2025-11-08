import { configureStore } from '@reduxjs/toolkit'
import sighn_normalReducer from '../Reducer/user/auth/sighnNormal'
import login_normalReducer from "../Reducer/user/auth/login"
export default configureStore({
  reducer: {
    sighn_normal:sighn_normalReducer,
    login_normal:login_normalReducer
  }
})
