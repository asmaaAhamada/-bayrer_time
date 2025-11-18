import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from '../../Backend/ApiServeces';
import { BaseUrl, GET_PAYRER_TIME } from "../../Backend/Api";

const initialState = {
   data: {},
    loading: false,
    error: null,
    method: 5,
};

 
export const fetchPrayerTimes = createAsyncThunk(
  "prayerTimes/fetchPrayerTimes",
  async (_, thunkAPI) => {
    const method = thunkAPI.getState().prayerTimes.method; // 🔥
    console.log("🟢 METHODE:", method);

    try {
      const res = await getData(
        `http://127.0.0.1:8000/api/getPrayerTimes?method=${method}`
      );
      // console.log(res)
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "حدث خطأ");
    }
  }
);


const prayerTimesSlice = createSlice({
  name: "prayerTimes",
  initialState,
  reducers: {
  setMethod: (state, action) => {
    state.method = action.payload;
  },
},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPrayerTimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrayerTimes.fulfilled, (state, action) => {
        state.loading = false;

  state.data = action.payload; 

      })
      .addCase(fetchPrayerTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setMethod } = prayerTimesSlice.actions;

export default prayerTimesSlice.reducer;
