import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import LoadingScreen from "components/LoadingScreen";

const GuestGuard = ({ children }) => {
  const { isAuthenticated, isInitialised } = useAuth();

  if(!isInitialised){
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/my-account" />;
  }

  // Render the children (protected components) if authenticated
  return children;
};

export default GuestGuard;