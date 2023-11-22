import React from "react";
// import Style from "./ProtectedRoute.module.css";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  return (
    <>
      {localStorage.getItem("userToken") ? props.children : <Navigate to={"/onlineShopReactjs/login"} />}
    </>
  );
}
