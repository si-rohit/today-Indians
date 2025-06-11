// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userFolders: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    setUserFolders(state, action) {
      state.userFolders = action.payload;
    },
  },
});

export const { setUser, logout, setUserFolders } = authSlice.actions;
export default authSlice.reducer;
