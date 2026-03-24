import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";

const ProtectedRoute = ({ roleRequired }) => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && !currentUser.roles.includes(roleRequired)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
