import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // User details
    token: null, // JWT token
    isAuthenticated: false, // Login status
    isInitialised: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isInitialised = true;
    },
    clearAuth: (state) => {
      state.isInitialised = null;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isInitialised = true;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;