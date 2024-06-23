import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MessageBox } from "../components";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Redux/Slices/AuthSlice";

export default function AdminProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      if (jwt_decode(token)?.exp < Date.now() / 1000) {
        // ctxDispatch({ type: "USER_SIGNOUT" });
        dispatch(logOut());
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");

        navigate("/");
      }
    };

    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return userInfo ? (
    userInfo.role === "admin" || "Admin" ? (
      children
    ) : (
      <MessageBox variant={"danger"}>Restricted</MessageBox>
    )
  ) : (
    <Navigate to="/" />
  );
}
