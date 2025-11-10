import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, MAKEREAD } from '../../Backend/Api';
import {  patchData, postData, postDataWithToken } from '../../Backend/ApiServeces';

export const MAKE_READ = createAsyncThunk(
  'todos/MAKE_READ',
  async (zekr_category_id, { rejectWithValue }) => {
    try {

    
      const body = {zekr_category_id :zekr_category_id };

      console.log("📤 Sending body:", body);

      const response = await patchData(`${BaseUrl}${MAKEREAD}`,body, {}, true);
      return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'MAKE_READ',
    initialState: {
       isloading:false,
       data:{},
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(MAKE_READ.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(MAKE_READ.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
            
          })
       .addCase(MAKE_READ.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; // رسالة الخطأ القادمة من rejectWithValue
          })
        }
  })
  
  // Action creators are generated for each case reducer function
 
  
  export default counterSlice.reducer