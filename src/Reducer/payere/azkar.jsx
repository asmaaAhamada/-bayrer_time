import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl, BY_CATEGORY, Categories } from "../../Backend/Api";

// جلب جميع التصنيفات (categories)
export const fetchCategories = createAsyncThunk(
  "azkar/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BaseUrl}${Categories}`);
      return res.data.data; // حسب شكل الـ response
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// جلب الأذكار حسب الصنف
export const fetchAzkarByCategory = createAsyncThunk(
  "azkar/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BaseUrl}${BY_CATEGORY}?category_id=${categoryId}`
      );
      return res.data.data.azkar;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const azkarSlice = createSlice({
  name: "remembrances",
  initialState: {
    categories: [],
    azkar: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // التصنيفات
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // الأذكار حسب الصنف
      .addCase(fetchAzkarByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAzkarByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.azkar = action.payload;
      })
      .addCase(fetchAzkarByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default azkarSlice.reducer;
