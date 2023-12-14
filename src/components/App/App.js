import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Offers from '../Offers/Offers';

function App() {
  return (
    <div className="wrapper">
      <h1>Influence Mobile</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
