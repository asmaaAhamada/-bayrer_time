import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, CALENDER, CONVERT, GET_QIBLA, HIJRI } from '../../Backend/Api';
import { getData } from '../../Backend/ApiServeces';

export const fetchconvert = createAsyncThunk(
  'todos/convert',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData(`${BaseUrl}${HIJRI}${CONVERT}`);
return response
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'convert',
    initialState: {
       Isloading:false,
  data: null,
       error:null
    },
    reducers: {
    
    }, extraReducers: builder => {
        builder
          .addCase(fetchconvert.pending, (state, action) => {
            state.Isloading = true
          })
          .addCase(fetchconvert.fulfilled, (state, action) => {
  state.Isloading = false
  state.data = action.payload
})

       .addCase(fetchconvert.rejected, (state, action) => {
            state.Isloading = false;
            state.error = action.payload; // رسالة الخطأ القادمة من rejectWithValue
          })
        }
  })
  
  // Action creators are generated for each case reducer function
 
  
  export default counterSlice.reducer