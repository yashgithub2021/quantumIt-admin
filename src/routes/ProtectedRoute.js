import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { userInfo } = true;
  return userInfo ? children : <Navigate to="/" />;
}