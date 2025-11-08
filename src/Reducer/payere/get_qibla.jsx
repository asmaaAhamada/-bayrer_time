import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, GET_QIBLA } from '../../Backend/Api';
import { getData } from '../../Backend/ApiServeces';

export const fetch_get_qibla = createAsyncThunk(
  'todos/get_qibla',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${GET_QIBLA}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'get_qibla',
    initialState: {
       isloading:false,
       data:[],
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetch_get_qibla.pending, (state, action) => {
            state.isloading = true
          })
          .addCase(fetch_get_qibla.fulfilled, (state, action) => {
            state.isloading = false
            state.data = action.payload
            
          })
       .addCase(fetch_get_qibla.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload; // رسالة الخطأ القادمة من rejectWithValue
          })
        }
  })
  
  // Action creators are generated for each case reducer function
 
  
  export default counterSlice.reducer