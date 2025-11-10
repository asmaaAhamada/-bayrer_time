import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../../Backend/ApiServeces';
import { BaseUrl, LOGIN } from '../../../Backend/Api';
import { setUserData } from '../userInfo';
import Cookies from "universal-cookie";

const initialState = {
  formInfo: {
   
    email: '',
    password: '',
    
  },
  isLoading: false,
  error: null,
};

//  هنا منجيب الموقع داخل الـ thunk نفسه
export const login_normal = createAsyncThunk(
  'SighnManaul/login_normal',
  async (_, { getState, rejectWithValue ,dispatch}) => {
    try {
      const state = getState();
      const {  email, password } = state.login_normal.formInfo;

    
      // نجهز البيانات للإرسال
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      

      const response = await postData(`${BaseUrl}${LOGIN}`, formData, {}, true);
            console.log("📦 register response:", response);

const user = response.data?.user;  
      const token = response.data?.access_token;


 const cookies = new Cookies();
      cookies.set('access_token', token, {
        path: '/',
        maxAge: 86400, // يوم واحد
      });
  if (user) {
  dispatch(setUserData({ user }));
}

return user;
    } catch (error) {
      return rejectWithValue(error?.message || "فشل التسجيل");
    }
  }
);

const formSlice = createSlice({
  name: 'login_normal',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login_normal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login_normal.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login_normal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm } = formSlice.actions;
export default formSlice.reducer;
