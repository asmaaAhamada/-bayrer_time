import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../Backend/ApiServeces";

// 🔹 1. دالة لجلب المفضّلات من السيرفر
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData("http://127.0.0.1:8000/api/favorites");
      console.log("✅ Favorites from API:", response);

      // إذا السيرفر بيرجع كائنات، منحوّلها لـ IDs
      const data = response.data;
      if (Array.isArray(data) && typeof data[0] === "object") {
        return data.map((fav) => fav.id);
      }

      // أما إذا بيرجع مصفوفة أرقام أصلاً
      return data;
    } catch (error) {
      console.error("❌ Error fetching favorites:", error);
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 2. إنشاء الـ slice
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // ممكن نضيف لاحقاً toggleFavorite أو clearFavorites
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload || [];
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default favoritesSlice.reducer;
