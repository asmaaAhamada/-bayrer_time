import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, CALENDER, GET_QIBLA, HIJRI } from '../../Backend/Api';
import { getData } from '../../Backend/ApiServeces';

export const fetch_get_date = createAsyncThunk(
  'todos/get_data',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${HIJRI}${CALENDER}`);
return response
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'get_data',
    initialState: {
       isloading:false,
  data: null,
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetch_get_date.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(fetch_get_date.fulfilled, (state, action) => {
  state.isloading = false
  state.data = action.payload
})

       .addCase(fetch_get_date.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; // رسالة الخطأ القادمة من rejectWithValue
          })
        }
  })
  
  // Action creators are generated for each case reducer function
 
  
  export default counterSlice.reducer