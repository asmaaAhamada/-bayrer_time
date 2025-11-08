import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, GET_CITY } from '../../Backend/Api';
import { getData } from '../../Backend/ApiServeces';

export const fetch_get_city = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${GET_CITY}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'get_city',
    initialState: {
       isloading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetch_get_city.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(fetch_get_city.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
            
          })
       .addCase(fetch_get_city.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; // رسالة الخطأ القادمة من rejectWithValue
          })
        }
  })
  
  // Action creators are generated for each case reducer function
 
  
  export default counterSlice.reducer