// Routes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import Registration from "../Login/Registration";
import Offers from "../Offers/Offers";
import Login from "../Login/Login";
import useToken from "./UseToken";

export default function App() {
  const { token, setToken } = useToken();

  return (
    <div>
      <h1>Influence Mobile</h1>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/registration" element={<Registration />} />
          <Route element={<AuthLayout token={token} />}>
            <Route path="/offers" element={<Offers token={token} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
