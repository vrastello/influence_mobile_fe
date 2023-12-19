import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// redirect to login if no token
export default function AuthLayout({ token }) {
  if (!token?.token) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}
