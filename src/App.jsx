import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Login from "./pages/loginpage"
import ForgotPsswordPage from './pages/forgotpasswordpage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPsswordPage />} />
      
      </Routes>
    </Router>
  );
}

export default App;
