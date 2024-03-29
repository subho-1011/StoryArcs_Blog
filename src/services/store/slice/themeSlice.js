import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // darkMode: localStorage.getItem("darkMode")
  //     ? JSON.parse(localStorage.getItem("darkMode")) : false
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("dark", JSON.stringify(state.darkMode));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
