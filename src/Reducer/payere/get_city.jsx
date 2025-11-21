import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'
import { BaseUrl, GET_CITY } from '../../Backend/Api';
import { getData, postData, postDataWithToken } from '../../Backend/ApiServeces';

export const fetch_get_city = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {

       // 📍 احصل على الموقع الحالي
      const coords = await new Promise((resolve) => {
        if (!navigator.geolocation) return resolve({ latitude: 0, longitude: 0 });
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          () => resolve({ latitude: 0, longitude: 0 }),
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });

      const { latitude, longitude } = coords;
      const formData = new FormData();
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
// console.log([...formData]);
for (let pair of formData.entries()) {
  console.log(pair[0] + ": " + pair[1]);
}

      const response = await getData(`http://127.0.0.1:8000/api/get-city`, {}, true);
      console.log(response)
return response;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const counterSlice = createSlice({
    name: 'get_city',
    initialState: {
       isloading:false,
       data:{},
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