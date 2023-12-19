// Routes.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import Registration from "../Login/Registration";
import Offers from "../Offers/Offers";
import Login from "../Login/Login";
import Admin from "../Admin/Admin";
import useToken from "./UseToken";
import OfferView from "../Admin/OfferView";

export default function App() {
  const { token, setToken } = useToken();
  const [error, setError] = useState(false);

  return (
    <div>
      <h1>Influence Mobile</h1>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Login setToken={setToken} error={error} setError={setError} />
            }
          />
          <Route
            path="/registration"
            element={<Registration error={error} setError={setError} />}
          />
          <Route element={<AuthLayout token={token} />}>
            <Route
              path="/"
              element={
                <Offers token={token} error={error} setError={setError} />
              }
            />
            <Route
              path="/admin"
              element={
                <Admin token={token} error={error} setError={setError} />
              }
            />
            <Route
              path="/admin/:id"
              element={
                <OfferView token={token} error={error} setError={setError} />
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
