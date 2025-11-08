import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../../Backend/ApiServeces';
import { BaseUrl } from '../../../Backend/Api';
import Cookies from 'universal-cookie';

const initialState = {
  formInfo: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
  isLoading: false,
  error: null,
};

//  هنا منجيب الموقع داخل الـ thunk نفسه
export const SighnManaul = createAsyncThunk(
  'SighnManaul/SighnManaul',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { name, email, password, password_confirmation } = state.sighn_normal.formInfo;

      //  نحصل على الإحداثيات من المتصفح
     const coords = await new Promise((resolve, reject) => {
  if (!navigator.geolocation) return resolve({ latitude: 0, longitude: 0 }); // بديل افتراضي
  navigator.geolocation.getCurrentPosition(
    pos => resolve(pos.coords),
    err => resolve({ latitude: 0, longitude: 0 }), // fallback لو رفض المستخدم
    { enableHighAccuracy: true, timeout: 10000 }
  );
});


      const { latitude, longitude } = coords;

      // نجهز البيانات للإرسال
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      const response = await postData(`${BaseUrl}register`, formData, {}, true);

const token=response.token
      const cookies = new Cookies();
      cookies.set("access_token", token, {
        path: "/",
        maxAge: 86400,
      });

      return response.user;
    } catch (error) {
      return rejectWithValue(error?.message || "فشل التسجيل");
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(SighnManaul.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SighnManaul.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(SighnManaul.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm } = formSlice.actions;
export default formSlice.reducer;
