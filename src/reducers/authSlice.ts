import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    deleteToken: (state) => {
      state.accessToken = "";
    },
  },
});

export const { setToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;
