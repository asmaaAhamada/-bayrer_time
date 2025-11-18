import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getData, postData, postDataWithToken } from '../../Backend/ApiServeces';
import { BaseUrl, NEXT } from "../../Backend/Api";

const initialState = {
   data: {},
    loading: false,
    error: null,
    method: 5,
};

 
export const fetchnnextTimes = createAsyncThunk(
  "prayerTimes/fetchnnextTimes",
  async (_, thunkAPI) => {
    const method = thunkAPI.getState().prayerTimes.method; // 🔥
    console.log("🟢 METHODE:", method);

    try {
      const res = await getData(
        `${BaseUrl}${NEXT}?method=${method}`
      );
            // console.log(res)

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "حدث خطأ");
    }
  }
);


const prayerTimesSlice = createSlice({
  name: "fetchnnextTimes",
  initialState,
  reducers: {
  setMethod: (state, action) => {
    state.method = action.payload;
  },
},

  extraReducers: (builder) => {
    builder
      .addCase(fetchnnextTimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchnnextTimes.fulfilled, (state, action) => {
        state.loading = false;

  state.data = action.payload; 

      })
      .addCase(fetchnnextTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setMethod } = prayerTimesSlice.actions;

export default prayerTimesSlice.reducer;
