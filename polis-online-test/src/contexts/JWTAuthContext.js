import React, { createContext, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, clearAuth } from "../slices/authSlice";
import { useCookies } from "react-cookie";
import axios from "axios";

// Create Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);

  // Login Function
  const login = async (email, password) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      let plainTextToken = token.plainTextToken;
      // Save token in cookies
      setCookie("authToken", plainTextToken, { path: "/", httpOnly: false });

      // Update Redux state
      dispatch(setAuth({ user, plainTextToken }));
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error; // Rethrow error for further handling
    }
  };

  // Logout Function
  const logout = () => {
    // Remove token from cookies
    removeCookie("authToken", { path: "/" });

    // Clear Redux state
    dispatch(clearAuth());
  };

  // Fetch User Data using the token from the backend
  const fetchUserFromToken = useCallback(
    async (token) => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update Redux state with user info
        const user = response.data.user;
        dispatch(setAuth({ user, token }));
      } catch (error) {
        console.error("Failed to fetch user from token:", error.message);
        // Remove invalid token
        removeCookie("authToken", { path: "/" });
        dispatch(clearAuth());
      }
    },
    [dispatch, removeCookie] // Dependencies for fetchUserFromToken
  );

  useEffect(() => {
    const token = cookies.authToken;

    if (token) {
      // Optionally validate the token and fetch user data
      fetchUserFromToken(token);
    } else {
      // No token found, ensure state is cleared
      dispatch(clearAuth());
    }
  }, [cookies.authToken, dispatch, fetchUserFromToken]); 

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
