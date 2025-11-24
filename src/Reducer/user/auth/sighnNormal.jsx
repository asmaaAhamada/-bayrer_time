import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../../Backend/ApiServeces';
import { BaseUrl } from '../../../Backend/Api';
import Cookies from 'universal-cookie';
import { requestForToken } from '../../../notifay/forToken';





const initialState = {
  formInfo: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',deviceToken:''
  },
  isLoading: false,
  error: null,
  user: null,
};

export const SighnManaul = createAsyncThunk(
  'SighnManaul/SighnManaul',
  async (_, { getState, rejectWithValue ,dispatch}) => {
    try {
      const state = getState();
      const { name, email, password, password_confirmation } = state.sighn_normal.formInfo;
      //ديفايس توكن
 const deviceToken = await requestForToken();

      console.log(" deviceToken:", deviceToken);
      //  احصل على الموقع الحالي
      const coords = await new Promise((resolve) => {
        if (!navigator.geolocation) return resolve({ latitude: 0, longitude: 0 });
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          () => resolve({ latitude: 0, longitude: 0 }),
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });

      const { latitude, longitude } = coords;

      // 📨 جهّز البيانات
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('password_confirmation', password_confirmation);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
formData.append('device_token', deviceToken);
      //  أرسل الطلب
      const response = await postData(`${BaseUrl}register`, formData, {}, true);
      console.log(" register response:", response);

      // 🪙 خزّن التوكن
      const cookies = new Cookies();
      cookies.set('access_token', response.token, {
        path: '/',
        maxAge: 86400, // يوم واحد
      });
  
return response.user;
    } catch (error) {
      return rejectWithValue(error?.message || 'فشل التسجيل');
    }
  }
);

const formSlice = createSlice({
  name: 'sighn_normal',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => {
    state.error = null;
  }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SighnManaul.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SighnManaul.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; //  تم تخزين اليوزر هنا
      })
      .addCase(SighnManaul.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm ,clearError } = formSlice.actions;
export default formSlice.reducer;
