import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../../Backend/ApiServeces';
import { BaseUrl,  REFRESH } from '../../../Backend/Api';

const initialState = {
  
  isLoading: false,
  error: null,
};

export const refreshToken = createAsyncThunk(
  'SighnManaul/login_normal',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();


      const response = await postData(`${BaseUrl}${REFRESH}`, formData, {}, true);



      return response.user;
    } catch (error) {
      return rejectWithValue(error?.message || "فشل التسجيل");
    }
  }
);

const formSlice = createSlice({
  name: 'refreshToken',
  initialState,
  reducers: {
    
    
   
  },
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

export default formSlice.reducer;
