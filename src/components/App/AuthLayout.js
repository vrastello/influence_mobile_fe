import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout({ token }) {
  console.log(
    `AuthLayout token: ${JSON.stringify(token)}}, role: ${token?.role}`
  );
  if (!token?.token) {
    console.log("navigate not working");
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}
