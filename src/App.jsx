import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Login from "./pages/loginpage"
import ForgotPsswordPage from './pages/forgotpasswordpage'
import SignUp from './pages/signuppage'
import ExploreLebanon from "./components/abouLeb";
import ChangePasswordPage from "./pages/changepasswordpage";
import EventsPage from "./pages/EventsPage";
import Beirut from "./pages/beirut";
import Favorites from "./pages/favoritepage";


function App() {
  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPsswordPage />} />
        <Route path="/signuppage" element={<SignUp />} />
        <Route path="/aboutLebanon" element={<ExploreLebanon />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/beirut" element={<Beirut />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
   
  );
}

export default App;
