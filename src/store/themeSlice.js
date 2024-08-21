import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
     state.themeMode = state.themeMode === "light" ? "dark" : "light"
    },
  },
});

export const {changeTheme} = themeSlice.actions

export default themeSlice.reducer