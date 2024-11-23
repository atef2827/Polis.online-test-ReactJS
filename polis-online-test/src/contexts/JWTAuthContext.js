import React, { createContext, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, clearAuth } from "../slices/authSlice";
import { useCookies } from "react-cookie";
import axios from "axios";
import Swal from 'sweetalert2';

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

      if(response.data.status === 'success'){
        const { token, user } = response.data;
        let plainTextToken = token.plainTextToken;
        // Save token in cookies
        setCookie("authToken", plainTextToken, { path: "/", httpOnly: false });
  
        // Update Redux state
        dispatch(setAuth({ user, plainTextToken }));

        Swal.fire({
          title: 'Успешно!',
          text: 'Успешный вход!',
          icon: 'success',
          // confirmButtonText: 'Ладно',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        let msg = "Ошибка.";
          if(response.data?.msg && typeof response.data.errors !== "object"){
            msg = response.data.msg;
          }else{
            if(typeof response.data.errors === "object"){
              msg = Object.values(response.data.errors)
              .flat()
              .join('\n');
            }
            if(!msg && response.data?.msg){
              msg = response.data?.msg;
            }
          }
        Swal.fire({
          title: 'Ошибка проверки данных!',
          text: msg,
          icon: 'error',
          confirmButtonText: 'Попробовать снова',
        });
      }
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
        if(response.data.status === 'success'){
          // Update Redux state with user info
          const user = response.data.user;
          dispatch(setAuth({ user, token }));
        }else{
          removeCookie("authToken", { path: "/" });
          dispatch(clearAuth());
        }
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
