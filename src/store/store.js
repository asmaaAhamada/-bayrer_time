import { configureStore } from '@reduxjs/toolkit'
import sighn_normalReducer from '../Reducer/user/auth/sighnNormal'
import login_normalReducer from "../Reducer/user/auth/login"
import refreshTokenReducer from "../Reducer/user/auth/refresh"
import userReduser from "../Reducer/user/userInfo"
import get_cityReducer from "../Reducer/payere/get_city"
import get_qiblaReducer from "../Reducer/payere/get_qibla"
import remembrancesReducer from "../Reducer/payere/azkar"
import get_staticcesReducer from "../Reducer/payere/get_staticsit"
import updateReducer from "../Reducer/user/update"
import MAKE_READReducer from "../Reducer/payere/makeread"
import favoritesReducer from "../Reducer/payere/favourite"
import prayerTimesReducer from "../Reducer/payere/prayerTime"
import fetchnnextTimesReducer from "../Reducer/payere/get_next_Payer"
import get_dataReducer from "../Reducer/date/all_data"
import convertReducer from "../Reducer/date/convert"
export default configureStore({
  reducer: {
    sighn_normal:sighn_normalReducer,
    login_normal:login_normalReducer,
    refreshToken:refreshTokenReducer,
    user:userReduser,
    update:updateReducer,
    get_city:get_cityReducer,
    get_qibla:get_qiblaReducer,
    remembrances:remembrancesReducer,
    get_staticces:get_staticcesReducer,
    MAKE_READ:MAKE_READReducer,
    favorites:favoritesReducer,
    prayerTimes:prayerTimesReducer,
    fetchnnextTimes:fetchnnextTimesReducer,
    get_data:get_dataReducer,
    convert:convertReducer
 }
})
