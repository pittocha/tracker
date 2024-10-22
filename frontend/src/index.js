import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import Home from "./pages/login/index"
import Etf from "./pages/etf/etf"
import Dashboard from './pages/dashboard/dashboard';
import Account from './pages/account/account';
import Wallet from './pages/wallet/wallet';
import Journal from './pages/journal/journal';
import Values from './pages/values/values';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/etf" element={<Etf />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/account' element={<Account />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='/values' element={<Values />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
