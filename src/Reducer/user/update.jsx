import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BaseUrl, UPDATE } from '../../Backend/Api';
import { postDataWithToken } from '../../Backend/ApiServeces';
import Cookies from 'universal-cookie';
import { setUserData } from './userInfo';

const initialState = {
  formInfo: {
    name: '',
    email: '',
    avatar: null, // يمكن أن يكون ملف صورة
  },
  isLoading: false,
  error: null,
};

export const update = createAsyncThunk(
  'profile/update',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState();
      const currentUser = state.user.user; // بيانات المستخدم الحالية
      const { email, name, avatar } = state.update.formInfo;

      // جهّز FormData للإرسال
      const formData = new FormData();
      formData.append('email', email || currentUser.email);
      formData.append('name', name || currentUser.name);
      if (avatar) formData.append('avatar', avatar);

      // إرسال الطلب للسيرفر
      const response = await postDataWithToken(`http://127.0.0.1:8000/api/profile/update`, formData, {}, true);
      console.log("📦 update response:", response);

      const user = response.user || response.data?.user;
      if (user) {
        dispatch(setUserData({ user })); // تحديث store العام
      }

      return user;
    } catch (error) {
      console.error("❌ updateProfile error:", error);
      return rejectWithValue(error?.message || 'فشل تحديث البروفايل');
    }
  }
);

const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    setformInfo: (state, action) => {
      state.formInfo = { ...state.formInfo, ...action.payload };
    },
    resetForm: () => initialState,
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(update.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setformInfo, resetForm, clearError } = updateSlice.actions;
export default updateSlice.reducer;
