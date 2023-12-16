import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../Login/Registration";
import Offers from "../Offers/Offers";

function App() {
  return (
    <div className="wrapper">
      <h1>Influence Mobile</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Offers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
