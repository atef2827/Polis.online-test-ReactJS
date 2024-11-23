import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import LoadingScreen from "components/LoadingScreen";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialised } = useAuth();

  if(!isInitialised){
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render the children (protected components) if authenticated
  return children;
};

export default AuthGuard;