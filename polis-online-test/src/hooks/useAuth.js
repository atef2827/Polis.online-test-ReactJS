// Custom Hook for Auth
import { useContext } from 'react';
import { useSelector } from "react-redux";
import AuthContext from '../contexts/JWTAuthContext';

// const useAuth = () => useContext(AuthContext);

// export default useAuth;

export const useAuth = () => {
    const context = useContext(AuthContext);
  
    // Extract user and isAuthenticated from Redux store
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isInitialised = useSelector((state) => state.auth.isInitialised);
  
    // Merge Redux state with context functions
    return {
      ...context,
      user,
      isAuthenticated,
      isInitialised,
    };
  };