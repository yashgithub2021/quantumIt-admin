import React from "react";
import { Navigate } from "react-router-dom";

export default function UnprotectedRoute({ children }) {
  const { userInfo } = true;
  return userInfo && userInfo?.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    children
  );
}
