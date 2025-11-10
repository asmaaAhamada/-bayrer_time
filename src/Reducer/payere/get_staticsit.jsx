import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, GET_CITY, GET_SUSTEICS } from '../../Backend/Api';
import { getData, postData, postDataWithToken } from '../../Backend/ApiServeces';

export const fetch_status = createAsyncThunk(
  'todos/fetch_status',
  async (_, { rejectWithValue }) => {
    try {

    

      
      const response = await getData(`${BaseUrl}${GET_SUSTEICS}`, {}, true);
      return response.weekly_statistics;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'get_staticces',
    initialState: {
       isloading:false,
       data:{},
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetch_status.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(fetch_status.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
            
          })
       .addCase(fetch_status.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; // رسالة الخطأ القادمة من rejectWithValue
          })
        }
  })
  
  // Action creators are generated for each case reducer function
 
  
  export default counterSlice.reducer