import { createSlice } from "@reduxjs/toolkit";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: "dark",
    loginModal: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", state.theme);
      document.documentElement.setAttribute("color-scheme", state.theme);
    },
    setTheme: (state, action) => {
      const theme = action.payload;
      state.theme = theme;
      document.body.setAttribute("data-theme", state.theme);
      document.documentElement.setAttribute("color-scheme", state.theme);
    },
    openLogin: (state) => {
      state.loginModal = true;
    },
    closeLogin: (state) => {
      state.loginModal = false;
    },
  },
});

export const { toggleTheme, setTheme, openLogin, closeLogin } =
  settingsSlice.actions;

export default settingsSlice.reducer;
