import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
    refreshToken: "",
    isLogged: false,
  },
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.accessToken = token;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    deleteTokens: (state) => {
      state.refreshToken = "";
      state.accessToken = "";
    },
    setLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    login: (state, action) => {
      state.isLogged = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isLogged = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const {
  setToken,
  setRefreshToken,
  deleteTokens,
  setLogged,
  login,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
