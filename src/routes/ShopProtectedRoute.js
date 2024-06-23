import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import MessageBox from '../screens/MessageBox';
import { Store } from '../Store';

export default function ShopProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? (userInfo.account_type==="shop"?(children):<MessageBox variant={"danger"}>Restricted</MessageBox>) : <Navigate to="/" />;
}