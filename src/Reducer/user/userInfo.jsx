import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  emial: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   setUserData(state, action) {
  state.name = action.payload.name;
  state.emial = action.payload.emial; // يطابق الـ payload
}
,
    clearUserData(state) {
      state.name = '';
      state.emial = '';
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
