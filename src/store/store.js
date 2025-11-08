import { configureStore } from '@reduxjs/toolkit'
import sighn_normalReducer from '../Reducer/user/auth/sighnNormal'
export default configureStore({
  reducer: {
    sighn_normal:sighn_normalReducer
  }
})
