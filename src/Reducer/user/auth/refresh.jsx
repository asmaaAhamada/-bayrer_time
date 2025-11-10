import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postDataWithToken } from '../../../Backend/ApiServeces';
import { BaseUrl, REFRESH } from '../../../Backend/Api';
import Cookies from 'universal-cookie';
import { setUserData } from '../userInfo';

const initialState = {
  isLoading: false,
  error: null,
};

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const cookies = new Cookies();
      const oldToken = cookies.get('access_token');

      if (!oldToken) {
        throw new Error('لا يوجد توكن لتجديده');
      }

      // استدعاء API الريفرش مع التوكن
      const response = await postDataWithToken(`${BaseUrl}${REFRESH}`, {}, {}, false);
const newToken = response.original?.access_token;

if (!newToken) {
  throw new Error('فشل تجديد التوكن');
}

// خزّن التوكن الجديد
cookies.set('access_token', newToken, { path: '/', maxAge: 86400 });

// إذا أردت، يمكن تحديث بيانات المستخدم فقط إذا كانت موجودة
if (response.data?.user) {
  dispatch(setUserData({ user: response.data.user }));
}

return true; // أو return newToken

    } catch (error) {
      return rejectWithValue(error?.message || 'فشل تجديد التوكن');
    }
  }
);

const refreshSlice = createSlice({
  name: 'refreshToken',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default refreshSlice.reducer;
